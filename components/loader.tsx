import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image
          alt="Logo"
          src="/logo.png"
          width={500}
          height={500}
        
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Ai Forge is thinking...
      </p>
    </div>
  );
};