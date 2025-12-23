import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadPages, clearPages, addPage } from "../store/slices/page.slice";

export default function Project() {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading } = useAppSelector((state) => state.pages);

  useEffect(() => {
    dispatch(loadPages({ projectId }));

    return () => {
      dispatch(clearPages());
    };
  }, [dispatch, projectId]);

  const handlePageClick = (pageId) => () => {
    // Navigate to page details or workflow view
    // For example, using react-router's useNavigate:
    navigate(`/pages/${pageId}/workflow`);
  };

  if (loading) return <p>Loading pages...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Pages</h1>

      <div className="grid grid-cols-3 gap-4">
        {items.map((page) => (
          <div
            key={page.id}
            className="border p-3 cursor-pointer hover:shadow"
            onClick={handlePageClick(page.id)}
          >
            <div className="h-24 bg-gray-200 mb-2">
              {page.thumbnailImage ? (
                <img src={page.thumbnailImage} alt="" />
              ) : (
                <span className="text-sm text-gray-500">No Image</span>
              )}
            </div>

            <p className="font-medium">{page.title}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          dispatch(
            addPage({
              projectId,
              data: { title: "Login Page" },
            })
          )
        }
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Add Page
      </button>
    </div>
  );
}
