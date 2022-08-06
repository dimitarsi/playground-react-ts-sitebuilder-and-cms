import React, { ChangeEvent, KeyboardEvent, useMemo } from "react";

import { BuilderProps } from "../../types";
import { Data } from "./types";

const DEFAULT_DATA: Data["data"] = {
  direction: "row",
  gap: 0,
  align: "space-between",
};

function getPublicComponentProps({
  data,
  id,
  type,
  parent,
}: Data & { data: Data["data"] | undefined }) {
  return {
    id,
    type,
    parent,
    data: data || DEFAULT_DATA,
  };
}

const SelectDirection = ({
  onChange,
  value,
}: {
  value: Data["data"]["direction"];
  onChange: (val: Data["data"]["direction"]) => void;
}) => {
  return (
    <select
      defaultValue={value}
      onChange={(e) => onChange(e.target.value as Data["data"]["direction"])}
    >
      <option value="row">Row</option>
      <option value="column">Column</option>
    </select>
  );
};

const SelectAlign = ({
  onChange,
  value,
}: {
  value: Data["data"]["align"];
  onChange: (val: Data["data"]["align"]) => void;
}) => {
  return (
    <select
      defaultValue={value}
      onChange={(e) => onChange(e.target.value as Data["data"]["align"])}
    >
      <option value="center">center</option>
      <option value="space-between">between</option>
      <option value="end">end</option>
    </select>
  );
};

const GapInput = ({
  onChange,
  value,
}: {
  value: Data["data"]["gap"];
  onChange: (val: Data["data"]["gap"]) => void;
}) => (
  <input
    defaultValue={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      onChange(parseFloat(e.target.value))
    }
  />
);

export const BuilderGridBlock = ({
  data,
  PublicComponent,
  PublicComponentChildren,
  Footer,
  onComponentUpdate,
  allPublicTypes,
}: BuilderProps<Data>) => {
  const publicData = useMemo(() => getPublicComponentProps(data), [data]);
  return (
    <>
      <div>
        <SelectDirection
          value={publicData.data.direction}
          onChange={(direction: Data["data"]["direction"]) =>
            onComponentUpdate({
              data: {
                ...data.data,
                direction,
              },
            })
          }
        />
        <GapInput
          value={publicData.data.gap}
          onChange={(gap: number) =>
            onComponentUpdate({
              data: {
                ...data.data,
                gap,
              },
            })
          }
        />
        <SelectAlign
          value={publicData.data.align}
          onChange={(align: Data["data"]["align"]) =>
            onComponentUpdate({
              data: {
                ...data.data,
                align,
              },
            })
          }
        />
      </div>
      <PublicComponent {...publicData}>
        <PublicComponentChildren id={data.id} />
      </PublicComponent>
      <Footer allowedPublicTypes={allPublicTypes} id={data.id} />
    </>
  );
};
