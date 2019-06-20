# rss-feed.yaml

## Editor Settings
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

## IAM Policies
- I try to follow the Principal, Action, Resource, Condition (PARC) format for my own sanity.
    - who, what, when, where, why
        - Principal -> who (can do the thing)?
        - Action -> what (can they do)?
        - Resource -> somewhere between what/where
        - Condition -> when?


## Creating the Sample Data
- I already had a S3 Bucket configured for website hosting, so I "cheated" and used the _AWS console_.
1. Using an existing S3 Bucket configured for static website hosting, create a folder titled `feeds`
2. Upload the following files to the `feeds` directory:
    ```
    - rss-sample.xml
    - sample.sgml
    ```
    - Note: the "structure" (fLaT) should now be:
    ```
    - feeds/rss-sample.xml
    - feeds/sample.sgml
    ```
- Note: If one is feeling fancy, one can use the cli to perform the upload as well.


## Kinesis
- IAM Policy
    - why the sts:externalId? 
    - Reference: [Grant Kinesis Data Firehose Access to an Amazon S3 Destination](https://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html?shortFooter=true#using-iam-s3)
    >  Edit the policy to replace account-id with your AWS account ID. This ensures that only you can request Kinesis Data Firehose to assume the IAM role.
- [Send the Data from Amazon CloudWatch to Kinesis Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/cw-to-delivery-stream.html)

## Cloudformation
- Validating the template - example command: 
```
aws cloudformation --profile agasper validate-template --template-body file://./aws/cloudformation/rss-feed.yaml
```
    - `--profile {profilename}` because I have to be sUfFiCiEnTly pErMisSiOnEd to validate the template (If memory serves, the validation is a little wonky)
- Event flow for (simple?) failure: `CREATE_IN_PROGRESS` -> `CREATE_FAILED` -> `ROLLBACK_IN_PROGRESS` -> `DELETE_SKIPPED`



### `vpc.yaml`
- >  If you specify MapPublicIpOnLaunch, you cannot specify AssignIpv6AddressOnCreation
    - Reference: [AWS::EC2::Subnet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-subnet.html#cfn-ec2-subnet-mappubliciponlaunch)
- `MapPublicIpOnLaunch` is the property that keeps resources launched into the space "private"
    - Example:
    ```
    PrivateSubnet1:
        Type: AWS::EC2::Subnet
        Properties:
          VpcId: !Ref VPC
          AvailabilityZone: !Select [0, !GetAZs '']
          CidrBlock: !Ref PrivateSubnet1CIDR
          MapPublicIpOnLaunch: false
    ```
- NAT Gateway
    - >  A NAT gateway can support up to 55,000 simultaneous connections to each unique destination. This limit also applies if you create approximately 900 connections per second to a single destination (about 55,000 connections per minute). If the destination IP address, the destination port, or the protocol (TCP/UDP/ICMP) changes, you can create an additional 55,000 connections. 
    - 900 (connections / second ) * (60 second / 1 minute ) = 54,000 connections / 1 minute

- Deployment
    - For mk1: 3 minutes 11 seconds to deploy




# Miscellaneous 
- [AWS Security at Scale Logging in AWS Whitepaper](https://d1.awsstatic.com/whitepapers/compliance/AWS_Security_at_Scale_Logging_in_AWS_Whitepaper.pdf)
- [Error Processor Sample Application for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/sample-errorprocessor.html?shortFooter=true#sample-errorprocessor-template)
- [AWS SAM Template for a CloudWatch Events Application](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduledevents-example-use-app-spec.html)

## AWS S3 Server Access Log (Sensible Chuckle)
- >  The completeness and timeliness of server logging is not guaranteed. The log record for a particular request might be delivered long after the request was actually processed, or it might not be delivered at all. The purpose of server logs is to give you an idea of the nature of traffic against your bucket. It is rare to lose log records, but server logging is not meant to be a complete accounting of all requests.
    - Reference: [AWS S3: Best Effort Server Log Delivery](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html?shortFooter=true#LogDeliveryBestEffort)

## Standard Generalized Markup Language (SGML)
- >   ISO Standard 8879:1986 Information Processing Text and
   Office Systems; Standard Generalized Markup Language (SGML).
- Real smart guys:
    - define a standard
    - put the definition behind a paywall