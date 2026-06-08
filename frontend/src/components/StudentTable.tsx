import scoreService from "../services/scoreService";

export default function ScoreTable({
  scores,
  onRefresh
}: {
  scores: any[];
  onRefresh: () => void;
}) {
  const handleDelete = async (id: number) => {
    await scoreService.remove(id);
    onRefresh();
  };

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr
