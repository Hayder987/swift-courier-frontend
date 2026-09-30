interface TextProprs {
  text?: string;
}

const LineDivider = ({ text }: TextProprs) => {
  return (
    <>
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />

        <span className="px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {text}
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>
    </>
  );
};

export default LineDivider;
