import React from "react";
import { FormEvent, useRef } from "react";
import { useAddPage } from "../context/hooks/useAddPage";
import { usePages } from "../context/hooks/usePages";
import { useRemovePage } from "../context/hooks/useRemovePage";
import { useSetCurrentPage } from "../context/hooks/useSetCurrentPage";

const handleSubmit = (method: CallableFunction) => (e: FormEvent) => {
  e.preventDefault();
  e.stopPropagation();
  method();
};

export const PageManager = () => {
  const pages = usePages();
  const activatePage = useSetCurrentPage();
  const r = useRef<HTMLInputElement>(null);
  const onAddPage = useAddPage();
  const removePage = useRemovePage();

  const addPage = () => {
    if (!r.current || !r.current.value) return;

    const name = r.current.value || `Page ${pages.length + 1}`;

    onAddPage({
      name,
      slug: "-",
      order: 0,
      pageId: name.replace(/\s+/, "-"),
    });

    r.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit(() => addPage())}>
      <div>
        {pages.map((page) => (
          <div key={page.name}>
            <span onClick={() => activatePage(page.pageId)}>{page.name}</span>
            {/* using generic button here triggers unintentional click when submiting the form with 'Enter' */}
            <span
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                removePage(page.pageId);
              }}
            >
              -
            </span>
          </div>
        ))}
      </div>
      <div>
        <input ref={r} />
        <button role={"form"} key="formSubmit">
          +
        </button>
      </div>
    </form>
  );
};
