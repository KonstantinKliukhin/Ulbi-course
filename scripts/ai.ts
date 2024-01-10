import {Project} from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts')
project.addSourceFilesAtPaths('src/**/*.tsx')


const files = project.getSourceFiles();

files.forEach(file => {
  const importDeclarations = file.getImportDeclarations();

  importDeclarations.forEach(importDeclaration => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (value.includes('assets/icons')) {
      const defaultImport = importDeclaration.getDefaultImport();
      const iconName = defaultImport?.getText();
      console.log('iconName: ', iconName);
      if (!iconName) return;

      importDeclaration.removeDefaultImport();
      importDeclaration.addNamedImport(iconName);
      importDeclaration.setModuleSpecifier('@/shared/assets');
    }
  })
})
