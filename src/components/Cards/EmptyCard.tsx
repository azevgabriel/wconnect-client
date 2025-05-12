export const EmptyCard = ({
  title = "Nenhum dado disponível",
  description = "Não há informações para exibir no momento.",
}) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-dashed border-gray-300 rounded-lg shadow-sm text-center">
      <h5 className="mb-2 text-xl font-semibold text-gray-500">{title}</h5>
      <p className="font-normal text-gray-400">{description}</p>
    </div>
  );
};
