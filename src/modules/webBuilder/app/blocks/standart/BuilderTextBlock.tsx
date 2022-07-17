import React, { PropsWithChildren } from "react";
import { useGetComponents } from "../../context/hooks/useGetComponents";
import { useUpdateComponent } from "../../context/hooks/useUpdateComponent";
import { useThrottle } from "../../hooks/useThrottle";

export type BuilderTextBlockState = {
  edit: boolean;
};

export const BuilderTextBlock = ({
  data,
  state,
  onSaveState,
  children,
}: PropsWithChildren<{
  data: { id: string; type: string; text: string };
  state: BuilderTextBlockState;
  onSaveState: (newState: BuilderTextBlockState) => void;
}>) => {
  const throttle = useThrottle();
  const { current } = useGetComponents(data.id);
  const onUpdateComponent = useUpdateComponent();

  return (
    <>
      <div>
        <button
          onClick={() => {
            onSaveState({ edit: !state?.edit });
          }}
        >
          {state?.edit ? "Cancel" : "Edit"}
        </button>
      </div>
      <div
        onInput={(e: React.FormEvent<HTMLDivElement>) => {
          throttle(
            () =>
              onUpdateComponent({
                ...current,
                data: (e.target as HTMLDivElement).innerHTML || "",
              }),
            50
          );
        }}
      >
        {children}
      </div>
    </>
  );
};
