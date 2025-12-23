import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadWorkflow,
  saveWorkflow,
  clearWorkflow,
  approveWorkflow,
  rejectWorkflow,
} from "../store/slices/workflow.slice";
import { useAuth } from "../auth/useAuth";

export default function Workflow() {
  const { pageId } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const { item, loading } = useAppSelector((state) => state.workflow);

  const [editMode, setEditMode] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    dispatch(loadWorkflow({ pageId }));
    return () => dispatch(clearWorkflow());
  }, [dispatch, pageId]);

  useEffect(() => {
    if (item && item.description) {
      setLines(item.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  const save = () => {
    dispatch(
      saveWorkflow({
        pageId,
        data: {
          description: lines,
          updatedBy: user.name,
        },
      })
    );
    setEditMode(false);
  };

  if (loading) return <p>Loading workflow...</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Workflow</h2>
        <span
          className={`inline-block mb-4 px-2 py-1 text-xs rounded ${
            item?.status === "approved"
              ? "bg-green-200"
              : item?.status === "rejected"
              ? "bg-red-200"
              : "bg-yellow-200"
          }`}
        >
          {item?.status}
        </span>

        <button onClick={() => setEditMode(true)} className="text-sm underline">
          Edit
        </button>
      </div>

      {editMode ? (
        <div className="space-y-2">
          {lines.map((line, i) => (
            <input
              key={i}
              value={line}
              onChange={(e) => {
                const copy = [...lines];
                copy[i] = e.target.value;
                setLines(copy);
              }}
              className="border p-2 w-full"
            />
          ))}

          <button
            onClick={() => setLines([...lines, ""])}
            className="text-sm underline"
          >
            + Add step
          </button>

          <button
            onClick={save}
            className="mt-4 bg-blue-600 text-white px-4 py-2"
          >
            Save
          </button>
        </div>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {item?.description?.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}

      {user.role === "manager" && item?.status === "pending_approval" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => dispatch(approveWorkflow({ pageId }))}
            className="bg-green-600 text-white px-4 py-2"
          >
            Approve
          </button>

          <button
            onClick={() => dispatch(rejectWorkflow({ pageId }))}
            className="bg-red-600 text-white px-4 py-2"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
