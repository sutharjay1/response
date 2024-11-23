import React, { useState } from "react";
import { X, MoveUp, MoveDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GrDrag } from "react-icons/gr";

type InputField = {
  id: number;
  type: "input";
  label: string;
  value: string;
};

type TextareaField = {
  id: number;
  type: "textarea";
  label: string;
  value: string;
};

type ButtonField = {
  id: number;
  type: "button";
  label: string;
};

type CheckboxField = {
  id: number;
  type: "checkbox";
  label: string;
  checked: boolean;
};

type FormElement = InputField | TextareaField | ButtonField | CheckboxField;

const DynamicForm = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const addField = (type: FormElement["type"]) => {
    const baseField = {
      id: Date.now(),
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    };

    const newField = {
      ...baseField,
      type,
      ...(type === "input" || type === "textarea" ? { value: "" } : {}),
      ...(type === "checkbox" ? { checked: false } : {}),
    } as FormElement;

    setFormElements([...formElements, newField]);
  };

  const handleChange = (id: number, key: string, value: string | boolean) => {
    setFormElements(
      formElements.map((element) =>
        element.id === id ? { ...element, [key]: value } : element,
      ),
    );
  };

  const moveElement = (index: number, direction: "up" | "down") => {
    const newElements = [...formElements];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newElements.length) {
      [newElements[index], newElements[newIndex]] = [
        newElements[newIndex],
        newElements[index],
      ];
      setFormElements(newElements);
    }
  };

  const removeElement = (id: number) => {
    setFormElements(formElements.filter((element) => element.id !== id));
  };

  const renderFormElement = (element: FormElement, index: number) => {
    const commonProps = {
      key: element.id,
      className: "bg-white rounded-lg p-4 shadow-sm border border-gray-200",
    };

    return (
      <div {...commonProps}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GrDrag className="text-gray-400" size={16} />
            <span className="text-sm font-medium text-gray-600">
              {element.type.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => moveElement(index, "up")}
              disabled={index === 0}
            >
              <MoveUp size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => moveElement(index, "down")}
              disabled={index === formElements.length - 1}
            >
              <MoveDown size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeElement(element.id)}
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Label</Label>
            <Input
              value={element.label}
              onChange={(e) =>
                handleChange(element.id, "label", e.target.value)
              }
              placeholder="Enter label"
              className="mt-1"
            />
          </div>

          {(element.type === "input" || element.type === "textarea") && (
            <div>
              <Label>Value</Label>
              {element.type === "input" ? (
                <Input
                  value={element.value}
                  onChange={(e) =>
                    handleChange(element.id, "value", e.target.value)
                  }
                  placeholder="Enter value"
                  className="mt-1"
                />
              ) : (
                <Textarea
                  value={element.value}
                  onChange={(e) =>
                    handleChange(element.id, "value", e.target.value)
                  }
                  placeholder="Enter value"
                  className="mt-1"
                />
              )}
            </div>
          )}

          {element.type === "checkbox" && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={element.checked}
                onChange={(e) =>
                  handleChange(element.id, "checked", e.target.checked)
                }
                className="rounded"
              />
              <span className="text-sm text-gray-600">Default state</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto w-full gap-6 space-x-9">
      <div className="flex w-full flex-1 flex-row gap-8 p-4">
        <div className="w-full">
          <Card className="md:mr-2">
            <CardHeader className="pt-6">
              <CardTitle>Form Builder</CardTitle>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => addField("input")}
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100"
                >
                  Add Input
                </Button>
                <Button
                  onClick={() => addField("textarea")}
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100"
                >
                  Add Textarea
                </Button>
                <Button
                  onClick={() => addField("button")}
                  variant="outline"
                  className="bg-purple-50 hover:bg-purple-100"
                >
                  Add Button
                </Button>
                <Button
                  onClick={() => addField("checkbox")}
                  variant="outline"
                  className="bg-orange-50 hover:bg-orange-100"
                >
                  Add Checkbox
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formElements.map((element, index) =>
                  renderFormElement(element, index),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <Card className="md:ml-2">
            <CardHeader className="pt-6">
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formElements.map((element) => {
                  switch (element.type) {
                    case "input":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label>{element.label}</Label>
                          <Input value={element.value} readOnly />
                        </div>
                      );
                    case "textarea":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label>{element.label}</Label>
                          <Textarea value={element.value} readOnly />
                        </div>
                      );
                    case "button":
                      return (
                        <Button
                          key={element.id}
                          className="mr-2"
                          variant="secondary"
                        >
                          {element.label}
                        </Button>
                      );
                    case "checkbox":
                      return (
                        <div
                          key={element.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={element.checked}
                            readOnly
                            className="mr-2 rounded"
                          />
                          <Label>{element.label}</Label>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
