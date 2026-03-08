export function ConfidenceSelector({
  value,
  onSelect
}: {
  value?: number;
  onSelect: (score: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-700">この回答への自信度（1=低い, 5=高い）</p>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            type="button"
            key={score}
            onClick={() => onSelect(score as 1 | 2 | 3 | 4 | 5)}
            className={`h-9 w-9 rounded-full border text-sm font-semibold ${
              value === score
                ? 'border-teal-800 bg-teal-700 text-white'
                : 'border-slate-300 bg-white text-slate-700'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}
