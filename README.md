# CryProjSchema
A JSON schema for [CRYENGINE](https://github.com/CRYTEK/CRYENGINE) projects (.cryproj files)

# FAQ
 * How is this project implemented?
   > This project is based on [gulp](https://github.com/gulpjs/gulp).
 * Is this an official project?
   > No, it's not. It's just a random project born because editing .cryproj files is annoying as you wouldn't get suggestions in any code editor. With a JSON schema, you will get them.
 * How can I use it in my projects?
   > There are several ways to do it.
   If you are using [Visual Studio Code](https://github.com/Microsoft/vscode), you can download this [extension](https://marketplace.visualstudio.com/items?itemName=l0ll098.cryproj).
 Otherwise you have to add the following line of code to the root of your <code>.cryproj</code> file (after the opening curly bracket)
    ```json
      "$schema": "http://json.schemastore.org/cryproj"
    ```
 * Can I generate the schema by myself?
   > Yes. [Read more in this section](#generate-schema-by-yourself)
 * Can I use this project to generate schemas for a custom version of CRYENGINE?
   > Yes. [Check this out](#generate-schema-for-custom-CRYENGINE-version)


# Generate schema by yourself
To generate a JSON schema you will need to follow these steps:
 - Install all dependencies by running <code>npm install</code>
 - Create a folder called <code>in</code>
 - Place in it the file called <code>consolecommandsandvars.txt</code> generated by CRYENGINE running in the console the command <code>DumpCommandsVars</code>
 - Rename the generated file to <code>consolecommandsandvars.VERSION.txt</code>, where VERSION is the engine version used to generate it, without the dot between the numbers that identify the major and minor version (for example: if you are using CRYENGINE 5.4, rename the generated file to consolecommandsandvars.54.txt)
 - Finally generate the schema running the command <code>npm run gulp</code>. The output will be in the folder <code>out</code>

# Generate schema for custom CRYENGINE version
 - Firstly, you need to follow the first four steps of [this guide](#generate-schema-by-yourself).
 - After that you will need to modify the <code>gulpfile.js</code> and adding the identifier of your engine in the <code>engineVersions</code> array (if you don't care about other versions, you can always delete them).
 - Finally you can generate the schema running the command <code>npm run gulp</code>. The output will be in the folder <code>out</code>

