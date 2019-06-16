# rss-feed.yaml
- For the IAM policies, I try to follow the Principal, Action, Resource, Condition (PARC) format for my own sanity.
who, what, when, where, why
Principal -> who (can do the thing)?
Action -> what (can they do)?
Resource -> somewhere between what/where
Condition -> when?


- Make VSCode shutup about undefined tags:
- Modify _either_ the *user* settings or the *workspace* settings with the following:
```
"yaml.customTags": [
"!And",
"!If",
"!Not",
"!Equals",
"!Or",
"!FindInMap sequence",
"!Base64",
"!Cidr",
"!Ref",
"!Sub",
"!GetAtt",
"!GetAZs",
"!ImportValue",
"!Select",
"!Select sequence",
"!Split",
"!Join sequence"
],
```

## Standard Generalized Markup Language (SGML)
- >   ISO Standard 8879:1986 Information Processing Text and
   Office Systems; Standard Generalized Markup Language (SGML).
- Real smart guys:
    - define a standard
    - put the definition behind a paywall



## Creating the Sample Data
- I already had a S3 Bucket configured for website hosting, so I "cheated" and used the _AWS console_.
1. Using an existing S3 Bucket configured for static website hosting, create a folder titled `feeds`
2. Upload the following files to the `feeds` directory:
```
- rss-sample.xml
- sample.sgml
```
    Note: the "structure" (fLaT ) should now be:
    ```
    - feeds/rss-sample.xml
    - feeds/sample.sgml
    ```
Note: If one is feeling fancy, one can use the cli to perform the upload as well.


## AWS S3 Server Access Log (Sensible Chuckle)
- >  The completeness and timeliness of server logging is not guaranteed. The log record for a particular request might be delivered long after the request was actually processed, or it might not be delivered at all. The purpose of server logs is to give you an idea of the nature of traffic against your bucket. It is rare to lose log records, but server logging is not meant to be a complete accounting of all requests.
    - Reference: [AWS S3: Best Effort Server Log Delivery](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html?shortFooter=true#LogDeliveryBestEffort)



## Kinesis
- IAM Policy
    - why the sts:externalId? 
    - Reference: [Grant Kinesis Data Firehose Access to an Amazon S3 Destination](https://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html?shortFooter=true#using-iam-s3)
    >  Edit the policy to replace account-id with your AWS account ID. This ensures that only you can request Kinesis Data Firehose to assume the IAM role.



## Miscellaneous 
- [AWS Security at Scale Logging in AWS Whitepaper](https://d1.awsstatic.com/whitepapers/compliance/AWS_Security_at_Scale_Logging_in_AWS_Whitepaper.pdf)
- [Error Processor Sample Application for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/sample-errorprocessor.html?shortFooter=true#sample-errorprocessor-template)
- [AWS SAM Template for a CloudWatch Events Application](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduledevents-example-use-app-spec.html)