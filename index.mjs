import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export const handler = async (event) => {
  
  const bucketOrigem = event.Records[0].s3.bucket.name;
  const arquivoNome = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  
  const bucketDestino = "projeto-sexta-saida"; 

  console.log(`Iniciando processamento do arquivo: ${arquivoNome}`);

  try {
    const getCommand = new GetObjectCommand({
      Bucket: bucketOrigem,
      Key: arquivoNome,
    });
    const response = await s3.send(getCommand);
    
    const bodyContents = await response.Body.transformToByteArray();

    const novoNome = `PROCESSADO_OFICIAL_${arquivoNome}`;

    const putCommand = new PutObjectCommand({
      Bucket: bucketDestino,
      Key: novoNome,
      Body: bodyContents,
      ContentType: response.ContentType
    });

    await s3.send(putCommand);

    console.log(`Sucesso! Arquivo movido para: ${bucketDestino}/${novoNome}`);
    return { statusCode: 200, body: 'Arquivo processado com sucesso!' };

  } catch (error) {
    console.error("Erro fatal:", error);
    return { statusCode: 500, body: error.message };
  }
};