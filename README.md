# AWS Cloud File Organizer

Projeto prático de Cloud Computing utilizando AWS S3 e AWS Lambda.

## Descrição
Este projeto automatiza a organização de arquivos. Ao fazer upload de um arquivo no bucket de entrada, uma função Lambda é acionada automaticamente para processar, renomear e mover o arquivo para um bucket de saída.

## Arquitetura
- **AWS S3:** Armazenamento de objetos (Buckets de Entrada e Saída)
- **AWS Lambda:** Processamento Serverless (Node.js)
- **IAM:** Gestão de permissões de segurança
