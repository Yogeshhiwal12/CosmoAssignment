import React, { useState } from 'react';

import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';
import './NestedForm.scss';
const NestedForm = () => {
    const [formFields, setFormFields] = useState([{ type: 'Object', fields: [{ type: 'String', fields: [], key: 0 }], key: 0 }]);


    const handleTypeChange = (path, value) => {
        const newFormFields = JSON.parse(JSON.stringify(formFields));
      
        let field = newFormFields;
        for (let i = 0; i < path.length; i++) {
          const index = path[i];
          if (i === path.length - 1) {
            field[index].type = value;
          } else {
            field = field[index].fields;
          }
        }
      
        setFormFields(newFormFields);
      };
      

      const addField = (path) => {
        const newFormFields = JSON.parse(JSON.stringify(formFields));
      
        let field = newFormFields;
        for (let i = 0; i < path.length; i++) {
          const index = path[i];
          if (i === path.length - 1) {
            field[index].fields.push({ type: 'String', fields: [], key: field[index].fields.length });
          } else {
            field = field[index].fields;
          }
        }
      
        setFormFields(newFormFields);
      };
      

      const removeField = (path) => {
        const newFormFields = JSON.parse(JSON.stringify(formFields));
      
        let field = newFormFields;
        for (let i = 0; i < path.length - 1; i++) {
          const index = path[i];
          field = field[index].fields;
        }
        field.splice(path[path.length - 1], 1);
      
        setFormFields(newFormFields);
      };
      

      const renderFields = (fields, parentPath) => {
        return fields.map((field, index) => {
          const currentPath = parentPath ? [...parentPath, index] : [index];
      
          return (
            <div key={field.key} style={{ marginLeft: parentPath !== null ? 40 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField label={parentPath === null ? 'Person' : 'Name'} />
                <FormControl sx={{ minWidth: 120, marginLeft: 8 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={field.type}
                    onChange={(e) => handleTypeChange(currentPath, e.target.value)}
                    label="Type"
                  >
                    <MenuItem value="String">String</MenuItem>
                    <MenuItem value="Number">Number</MenuItem>
                    <MenuItem value="Boolean">Boolean</MenuItem>
                    <MenuItem value="Object">Object</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <Button  className='btn1' variant="contained"  color="primary" onClick={() => addField(currentPath)}>
                    +
                  </Button>
                  {parentPath !== null && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeField(currentPath)}
                      style={{ marginLeft: 8 }}
                    >
                      -
                    </Button>
                  )}
                </div>
              </div>
              {field.type === 'Object' && renderFields(field.fields, currentPath)}
            </div>
          );
        });
      };
      

      return (
        <Container>
            <div className="nested-form">
        {renderFields(formFields, null)}
      </div>
        </Container>
    );
};

export default NestedForm;
