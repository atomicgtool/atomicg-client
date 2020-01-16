# AtomicG

AtomicG is a CLI model-first source code generation tool, that can be used to automate the generation of regular and 
boilerplate source code files for your project, like Rest API CRUDs handlers, SQL scripts, entity classes for ORMs, etc...
You can read more about this tool in the official web site https://www.atomicg.dev/, also join the discussion in our 
discord server https://discord.gg/n65mRJZ or send us an email with any concern you have to info@atomicg.dev

# Instalation

AtomicG cli client can be installed using npm, it's recommended to install it globally, so it can be use in any project of 
any supported platform.

    npm i @atomicg/atomicg -g

# Usage

The first thing to do is to create a model to work with. An initial AtomicG model can be generated with the init command.

    atomicg init

This will create the *atomicg.yml* file in the current folder, the created model it's simply a starting point, entities 
and generators must be added to the model to create useful code for the project. The next section describes in detail
how to write a model. To generate the source code for the current model just run the tool with no options.

    atomicg    

# Model Reference

This section describes the information that can be added to the model and the source code each one produce. The following
is an example of an atomicg model.

    model:
      name: MyModel
      description: My Model
    
      basepath:
    
      uses:
        - gen: mysql
        - gen: sequelize
        - gen: express
    
      # Entities to be generated for this model.
      entities:
        - name: User
          fields:
            - name: email
              type: string
            - name: password
              type: string
            - name: name
              type: string
        - name: Group
          fields:
            - name: name
              type: string

All model must have the root element *model* beneath it the following options are available.

| option      | description                          | required |
|-------------|--------------------------------------|----------|
| name        | The name of the model.               | yes      |
| description | A short description to this model.   | no       |
| uses        | The list of generators to use.       | yes      |
| entities    | The list of entities to be generated | yes      |

The *uses* option allows to add a list with all the generators that will be generating code for this model. At this moment 
only 3 are supported, they are de following.

| generator | description                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------|
| mysql     | generates the DDL script for MySQL database.                                                         |
| sequelize | generates a Sequelize model for each entity in the model.                                            |
| express   | generates an ExpressJS CRUD router for each entity in the model, that can be used as part of an API. |

The *entities* tag is used to specify the entities of the model and each entity has the following options.

| option | description                                                                           | required |
|--------|---------------------------------------------------------------------------------------|----------|
| name   | the name of the entity, that will be used for classes and file names for this entity. | yes      |
| fields | the list of fields for this entity.                                                   | yes      |
 
The tags for each field are the following.

| option    | description                                                                                                                       | required |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|----------|
| name      | the name of the field, this info will be used to generate properties and columns for the field.                                   | yes      |
| type      | the data type of the field, see the table of the available types for more information.                                            | yes      |
| required  | if the field is required or not, this determines if the column in the database allows null or not.                                | no       |
| length    | the length of the field for string and numeric types. for the text data type this field most be either null, tiny, medium or long | no       |
| decimals  | the number of decimals for floating-point data types                                                                              | no       |
| precision | the precision of the field for decimals types.                                                                                    | no       |
| scale     | the scale of the field for decimals types.                                                                                        | no       |
| index     | if the field must be indexed, see the index type table for more info.                                                             | no       |
| transform | the transformation that are needed by default on the data of the field. see the transformations table for more info.              | no       |
| values    | used with the enum datatype to specify the set of values that the enum accepts.                                                   | no       |

The following table shows the available datatypes.

| datatype | description                                           | SQL type                             | Sequelize type                       |
|----------|-------------------------------------------------------|--------------------------------------|--------------------------------------|
| boolean  | a boolean (true or false, usually 1 byte              | BOOLEAN                              | BOOLEAN                              |
| byte     | a 1 byte (8 bits) integer                             | TINYINT(length)                      | TINYINT(length)                      |
| short    | a 2 bytes (16 bits) integer                           | INTEGER(length)                      | INTEGER(length)                      |
| medium   | a 3 bytes (24 bits) integer                           | INTEGER(length)                      | INTEGER(length)                      |
| integer  | a 4 bytes (32 bits) integer                           | INTEGER(length)                      | INTEGER(length)                      |
| long     | a 8 bytes (64 bits) integer                           | BIGINT(length)                       | BIGINT(length)                       |
| char     | a fixed length string of characters                   | CHAR(length)                         | CHAR(length)                         |
| string   | a variable length string of characters                | VARCHAR(length)                      | STRING(length)                       |
| text     | a customizable (tiny, medium, long) text field        | TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT | TEXT, TEXT('tiny', 'medium', 'long') |
| float    | a single-precision floating-point number              | FLOAT(length, decimals)              | FLOAT(length, precision)             |
| double   | a double-precision floating-point number              | DOUBLE(length, decimals)             | DOUBLE(length, precision)            |
| decimal  | a decimal number that can store exact numbers.        | DECIMAL(precision, scale)            | DECIMAL(precision, scale)            |
| enum     | an enumeration field that only allows a set of values | ENUM(values)                         | ENUM                                 |

The following table shows the available options for the index tag.

| option  | description                                                                                                                                         |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| none    | this is the default option, it means that this field will not be indexed.                                                                           |
| indexed | this options means that the database generator and the orm generator will create and index on this field.                                           |
| unique  | this options is the same as indexed but the created index will be a unique index,  meaning that this field will have unique values in the database. |

The following table shows the available options for the transform tag.

| transform   | description                                                                             |
|-------------|-----------------------------------------------------------------------------------------|
| trim        | it will trim the white spaces characters from both size to any value pass to the field. |
| upper       | it will convert to upper case any value that is pass to the field.                      |
| lower       | it will convert to lower case any value that is pass to the field.                      |
| emptyToNull | it will convert to null any empty string that is pass to the field.                     |

NOTE: This transformations are applicable to string fields only.