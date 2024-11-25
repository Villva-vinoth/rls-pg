RLS in pg with one custom role and multiple tenant id 

i used here appuser and default postgres user --> common user retrieves any other that they can set with appuser and only admin uses postgres user to fetch all the columns

i have created a admin_users table in that only with the common postgres user so, that appuser has some retrictions, because we use appuser to create the table means 
the default table owner has no retriction while accessing table record or retrieve entire rows in the table 

i have configured here postgres user as a table owner and creating policy and restrictions.

after creating table admin_users,

insert some records in the table with 
http://localhost:4000/api/v1/auth/register
role here is consider as admin or user  --> with role_id 1 can considered as postgres user which has bypass techiques and user has a restriction

Here let's go current_user in postgres plays a vital role to fetch the current_user of the db and session_user is temporarily accessing the db.


here is the postgres query that the users inserted in the tables 

alter table admin_users enable row level security;
create policy tenant_policy on admin_users using ( id ::integer = (current_setting('app.tenant')::text)::integer)

NOTE :: this was the two query executed when ever you want tenant for other tables 

i m using here id in admin_user as tenant id 

make other table as tenant means , there should be a column tenant_id or created_by 
enable that these column has tenant_id ----- using ( created_by ::integer = (current_setting('app.tenant')::text)::integer)


if the policy created it is not accessible to any user because with default restriction 

Grant Select,insert,update on table admin_users to appuser 
grant usage,select,update on all sequences to appuser 

this is a single table access if want to access to all mention ALL privileges 

thus configuration completed 


http://localhost:4000/api/v1/users/getOne/2

with headers ->
tenantID : 2,
isadmin : 2

works -> isadmin :1 is non-restricted 

http://localhost:4000/api/v1/users/getOne/2

with headers ->
tenantID : 1,
isadmin : 2

when tenant id 1 accessing the user_id 2 is restricted with your policy!
