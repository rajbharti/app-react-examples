import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import Example from "src/components/Example";

interface CustomRefHandle {
  focus(): void;
  scrollToTop(): void;
  scrollToBottom(): void;
}
const TextArea = forwardRef<CustomRefHandle>(function TextArea(props, ref) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        console.log("focus() is invoked");
        textareaRef.current?.focus();
      },
      scrollToTop() {
        console.log("scrollToTop() is invoked");
        const el = textareaRef.current;
        el?.setSelectionRange(0, 0);
        el?.focus();
        el?.scrollTo(0, 0);
      },
      scrollToBottom() {
        console.log("scrollToBottom() is invoked");
        const el = textareaRef.current;
        const scrollHeight = el?.scrollHeight ?? 0;
        el?.setSelectionRange(scrollHeight, scrollHeight);
        el?.focus();
        el?.scrollTo(0, scrollHeight);
      },
    }),
    []
  );

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <Example>
      <textarea
        value={value}
        onChange={handleChange}
        ref={textareaRef}
        rows={4}
        className="w-72 resize-none"
        placeholder="Write multiple lines to get scroll and hit 'Scroll to top' button"
      ></textarea>
    </Example>
  );
});

export default function UseImperativeHandleCustomRef() {
  const ref = useRef<CustomRefHandle>(null);

  function handleFocus() {
    ref.current?.focus();
  }

  function handleScrollToTop() {
    ref.current?.scrollToTop();
  }

  function handleScrollToBottom() {
    ref.current?.scrollToBottom();
  }

  return (
    <Example title="Exposing a custom ref handle to the parent component">
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleScrollToTop}>Scroll to top</button>
      <button onClick={handleScrollToBottom}>Scroll to bottom</button>
      <TextArea ref={ref} />
    </Example>
  );
}
