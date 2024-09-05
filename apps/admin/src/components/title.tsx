import { Loader2 } from "lucide-react"; // Asegúrate de que Loader2 esté importado correctamente

interface Title {
  title: string;
  isLoading: boolean;
}

const Title: React.FC<Title> = ({ title, isLoading }) => {
  return (
    <h1 className="flex flex-row items-center space-x-2 text-2xl font-normal text-[#3A3A3A]">
      <span>{title}</span>
      {isLoading && <Loader2 className="animate-spin" />}
    </h1>
  );
};

export default Title;
