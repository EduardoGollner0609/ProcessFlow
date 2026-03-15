import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import UseCreateComment from "../../hooks/comments/use-create-comments";

const schema = z.object({
  content: z
    .string()
    .trim()
    .min(3, "O comentário precisa ter pelo menos 3 caracteres")
    .max(1000, "Comentário muito longo"),
});

export type CommentFormData = z.infer<typeof schema>;

type CommentFormProps = {
  processId: string;
};

export default function CommentForm({ processId }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
    },
  });

  const createComment = UseCreateComment();

  async function submit(data: CommentFormData) {
    const commentRequest = {
      content: data.content,
      processId,
    };

    await createComment.mutateAsync(commentRequest);
    reset({ content: "" });
  }

  return (
    <div className="pfd-panel">
      <div className="pfd-panelHead">
        <div className="pfd-panelTitle">Novo comentário</div>

        <button
          className="pfd-btn pfd-btn--primary"
          type="button"
          onClick={handleSubmit(submit)}
          disabled={createComment.isPending}
        >
          <FaPlus /> {createComment.isPending ? "Publicando..." : "Publicar"}
        </button>
      </div>

      <div className="pfd-panelBody">
        <div className="pfd-field">
          <label className="pfd-label">Comentário</label>

          <textarea
            className="pfd-textarea"
            rows={6}
            placeholder="Escreva um comentário para registrar atualizações, pendências ou observações..."
            {...register("content")}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleSubmit(submit)();
              }
            }}
          />

          <span className="pfd-fieldHint">
            Use comentários para criar um histórico claro do que foi feito e do
            que falta.
          </span>

          {errors.content && (
            <div className="pfd-error">{errors.content.message}</div>
          )}
        </div>

        <div className="pfd-helper">
          💡 Dica: use <strong>Ctrl + Enter</strong> para publicar rapidamente.
        </div>
      </div>
    </div>
  );
}