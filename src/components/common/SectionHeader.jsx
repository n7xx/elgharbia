const SectionHeader = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-8 lg:mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-gradient-accent rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
};

export default SectionHeader;
