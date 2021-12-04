# ARCHITECTURE

This application uses the following AWS Services:
1) Database is deployed in an RDS Postgres DB
2) Backend API is deployed using a Beanstalk for Node applications
3) Frontend is server trough an S3 Bucket

The architecture diagram is as follows:
![AWS_Architecture](AWS_Architecture.png)

## RDS

The database is a RDS service type postgres. Note that it is not required to make it publicly accessible due to the API that will interact with the RDS is within the same VPC (see previous architecture diagram)

![AWS_RDS_1](../screenshots/aws_rds_1.png)
![AWS_RDS_2](../screenshots/aws_rds_2.png)

## BEANSTALK

The express API is deployed in a Beanstalk service. This service needs to be published trough port 443 due to S3 bucket is also HTTPS. And therefore if API is not in HTTPS there is a security error 

![AWS_BEANSTALK_1](../screenshots/aws_beanstal_1.png)
![AWS_BEANSTALK_2](../screenshots/aws_beanstal_2.png)
![AWS_BEANSTALK_3](../screenshots/aws_beanstal_3.png)

Another important thing here is to configure in the beanstalk environment all the ENV variables required for the application to run (important to start express in 8081, which is the default port NGINX will redirect traffic):

![AWS_BEANSTALK_4](../screenshots/aws_beanstal_3.png)

## S3

Finally the angular application, due to it's a "static" can be easily published trough a S3 bucket. For that the only consideration is to flag the parameter "serve static website" in it's configuration

![AWS_S3_1](../screenshots/aws_s3_1.png)
![AWS_S3_2](../screenshots/aws_s3_2.png)
![AWS_S3_3](../screenshots/aws_s3_3.png)
