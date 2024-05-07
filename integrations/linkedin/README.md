# Linkedin Integration

## Environment variables and credentials setup
1. Go to https://developer.linkedin.com/ and sign in/sign up for a linkedin account.

2. Click on 'Create app' button and fill in the required details. (You need to create Company page on linkedin first)

3. Go to the Auth tab, click on 'OAuth 2.0 tools' link present with the 'Understanding authentication and OAuth 2.0' section on the right side of the page.

4. Create a new access token by clicking on 'Create token' button and select all the listed scopes like openid, profile, email etc. (important) and a new token will be generated. copy and paste it in your .env file under specific variable. Other creds like Client ID and Secret is available on the 'Auth' page itself.

5. Go the Products tab and enable access for 'Share on LinkedIn' and 'Sign In with LinkedIn using OpenID Connect' products. This gives access to various endpoints/apis we require. (Check out available endpoints by clicking on 'View endpoints' on respective product).

RECOMMENDED: (IMPORTANT) (Applicable as of 8th April, 2024)
 If you want to use Apis related to both individual and a organization , its recommended to enable single User related products like 'Share on LinkedIn', 'Sign In with LinkedIn using OpenID Connect' and 'Advertising API' within one app and organization related product like 'Community Management API' within a other separate app. Linkedin doesnt allows otherwise.

 The above is the reason for going ahead with having separate env vars like 'LINKEDIN_USER_ACCESS_TOKEN' and 'LINKEDIN_ORGANIZATION_ACCESS_TOKEN' (just duplicate resource.ts file).

 For getting 'Community Management API' and 'Advertising API' access, you need to have a proper company name with registeration and a domain. Linkedin gives you a request form where you need to fill these details,
 which is why I haven't been able to gain access to above and add test cases for Organization and Advertising specific apis. 
 
 Organization/'Community Management API' related usecase : 
  simple_post_organization, 
  get_members_organization_access_control_information
  search_organization etc.

 Advertising Api related usecase:
 retrieves_comments_on_comments,
 retrieve_comments_on_shares,
 get_member_profile etc. 

 (Check out available endpoints by clicking on 'View endpoints' on respective product)

 Check out relevant docs for recently released version, deprecated endpoints and migrations:
 https://learn.microsoft.com/en-us/linkedin/marketing/versioning?view=li-lms-2024-03
