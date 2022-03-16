drop table users;

create table users
	(
	username varchar(40) not null,
	pw varchar(20) not null,
	phone char(12) null,
	city varchar(40) null,
	acode varchar(20) null,
	fullname varchar(40) null,
	primary key (username));
 
grant select on users to public;

insert into users
values('test', 'test123', 
'415 658-9932', 'Vancouver', '415', 'Adam Smith');
 
-- insert into users
-- values ('213-46-8915', 'Green', 'Marjorie',
-- '415 986-7020', '309 63rd St. #411', 'Oakland', 'CA', '94618');
 