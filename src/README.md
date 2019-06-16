# 1. Create S3 Bucket for Lambda Functions
## ***ASSUMPTION*** : The S3 bucket is in the same region as your CloudFormation Script
    1. Create separate S3 Bucket for the lambda functions, e.g. `rss-feed-lambda-functions`

# 2. Convert js to zip
    1. Right click `*.js` file in windows explorer 
    2. "Add to filename.zip" (create zip) 

## 3. Upload to `rss-feed-lambda-functions`
- Drag+drop/upload through CLI zip file into
`rss-feed-lambda-functions`
OR
- Using the CLI
    Note: [Order matters for `exclude` `include` filtering](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html#use-of-exclude-and-include-filters)
_Assumes_:
    1. On S3 copy command execution, relative to the the present working directory, there exists a child directory title `lambda/`
    2. The lambda functions have been zipped up.
    
`aws s3 cp ./lambda/ s3://rss-feed-lambda-functions/ --recursive --exclude "*" --include "*.zip"`

# `lambda/tests`
## createPostTest.json
- Event object 


- Note: Yes, this could have been done with the CDK, but I'm trying to prototype this quickly and am more comfortable with straight YAML than I am dealing with the CDK.