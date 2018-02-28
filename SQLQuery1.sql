

SET IDENTITY_INSERT Department ON

INSERT Department ([Id],[OrganizationId], [Name],[Description],[IsActive],[CreatedBy],[UpdatedBy]) 
VALUES 
(1	,1,	'Admin'		,''	,	1,'c06c843f-18b7-4c71-9851-8e9162d3c7f7','c06c843f-18b7-4c71-9851-8e9162d3c7f7')

SET IDENTITY_INSERT Department OFF

SET IDENTITY_INSERT Designation ON

INSERT Designation ([Id],[OrganizationId],[LevelId], [Name],[Description],[IsActive],[CreatedBy],[UpdatedBy]) 
VALUES 
(1	,1,	1,'Admin'		,''	,	1,'c06c843f-18b7-4c71-9851-8e9162d3c7f7','c06c843f-18b7-4c71-9851-8e9162d3c7f7')

SET IDENTITY_INSERT Designation OFF



SET IDENTITY_INSERT UnitOfMeasure ON
INSERT UnitOfMeasure ([ID],[UnitTypeId],[Name],[DigitAfterDecimal],[CreatedBy],[UpdatedBy]) 
VALUES 
(	1,1	,	'Grams'		,0,'c06c843f-18b7-4c71-9851-8e9162d3c7f7','c06c843f-18b7-4c71-9851-8e9162d3c7f7'),
(	2,2	,	'Kilograms'	,3,'c06c843f-18b7-4c71-9851-8e9162d3c7f7','c06c843f-18b7-4c71-9851-8e9162d3c7f7')	

SET IDENTITY_INSERT UnitOfMeasure OFF

select * from  [dbo].[User]


INSERT [dbo].[User] ([Id],[OrganizationId],[SubOrganizationTypeId],[UserTypeId],[RoleId],[DepartmentId],[DesignationId],[CodePrefix],[Code], [FirstName],[LastName],[LoginName],[PasswordHash],[IsActive],[CreatedBy],[UpdatedBy]) 
VALUES 
('c06c843f-18b7-4c71-9851-8e9162d3c7f7',1,1,1,1,1,1,'WA-','0001','Admin','Admin','Admin','MTIzNDU2',1,'c06c843f-18b7-4c71-9851-8e9162d3c7f7','c06c843f-18b7-4c71-9851-8e9162d3c7f7')

