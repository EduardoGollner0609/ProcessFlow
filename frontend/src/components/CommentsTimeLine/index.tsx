import { FaCommentDots, FaRegTrashAlt } from "react-icons/fa";
import EmptyState from "../EmptyState";
import { UseComments } from "../../hooks/comments/use-comments";
import UseDeleteComment from "../../hooks/comments/use-delete-comment";

interface CommentsTimelineProps {
    processId: string;
}

export default function CommentsTimeline({
    processId,
}: CommentsTimelineProps) {

    const { data: comments } = UseComments(processId);
    const useDeleteComment = UseDeleteComment();

    async function onDeleteComment(id: string) {
        await useDeleteComment.mutateAsync(id);
    }

    return (
        <div className="pfd-panel">
            <div className="pfd-panelHead">
                <div className="pfd-panelTitle">Linha do tempo</div>
                <div className="pfd-panelSub">{(comments?.length ?? 0).toString()} registro(s)</div>
            </div>

            <div className="pfd-panelBody">
                {!comments?.length ? (
                    <EmptyState
                        icon={<FaCommentDots />}
                        title="Sem comentários ainda"
                        subtitle="Quando você publicar, eles aparecem em ordem."
                    />
                ) : (
                    <div className="pfd-timeline">
                        {comments.map((c) => (
                            <div className="pfd-comment" key={c.id}>
                                <div className="pfd-commentHead">
                                    <div className="pfd-commentAuthor">
                                        Eduardo
                                    </div>
                                    <div className="pfd-commentDate">
                                        {formatDate(c.createMoment)} • {formatTime(c.createMoment)}
                                    </div>
                                    <button
                                        className="pfd-miniDanger"
                                        type="button"
                                        title="Excluir comentário"
                                        onClick={() => onDeleteComment(c.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>

                                <div className="pfd-commentBody">{c.content}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function formatDate(value?: string): string {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("pt-BR");
}

function formatTime(value?: string): string {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}