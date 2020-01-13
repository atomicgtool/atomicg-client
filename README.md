# AtomicG

AtomicG is a CLI source code and text file generation tool.

# Instalation

AtomicG cli client can be installed using npm, it's recomended to install the cli globaly.

    npm i @atomicg/atomicg -g

# Usage

The first thing to do is to create a model to work with. An initial AtomicG model can be generated with the init command.

    atomicg init
    
This will create the atomicg.yml file in the current folder, the created model it's simply a starting point, entities 
and generators must be added to the model to create usefull code for the project. The next section describes in detail
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

All model must have the root element "model" beneath it the following options are availables.

| option      | description                          | required |
|-------------|--------------------------------------|----------|
| name        | The name of the model.               | yes      |
| description | A short description to this model.   | no       |
| uses        | The list of generators to use.       | yes      |
| entities    | The list of entities to be generated | yes      |

The uses option allows to add a list with all the generators that will be generating code for this model. At this moment 
only 3 are supported, they are de following.

| generator | description                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------|
| mysql     | generates the DDL script for MySQL database.                                                         |
| sequelize | generates a Sequelize model for each entity in the model.                                            |
| express   | generates an expressjs CRUD router for each entity in the model, that can be used as part of an API. |