## Wrong.
It should be: 
- someone uploads a new valid sgml file to a `content` bucket
- this emits an event to lambda to fetch the subscription

1. The CloudFormation template should:
    - define the content bucket
    - define the lambda function
    - output
        - lambda
        - s3 content bucket
2. There should be a _second_ cloudformation template that is a change set
    - 


## Why is this wrong? ...is it?
- Why should it be:
```
s3 -event-> lambda 
```
```
-cloudwatch event-> lambda -> s3
```

Hmm..
I think an aggregator can run on a schedule, but a reader should probably be triggered 


- I'll need to mull this one over because 

If:
```
GET: Query -> Handler - Response
POST: Command -> Handler -> Response 
```
then that's probably why the idea of:
---------
| aether | -event-> lambda -GET-> 
----------
then -GET-> (again) 
for the template thereby changing the global state makes me raise an eyebrow.


[AWS CloudFormation S3 Bucket Notifications](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html)



# Infrastructure

## General
- Lack of explicit termination protection on the stacks themselves
- Inconsistent use of resource tags
    - [How should I tag my AWS resources](https://aws.amazon.com/answers/account-management/aws-tagging-strategies/)
