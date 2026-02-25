import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import UseCreateTask from "../../hooks/tasks/use-create-task";

const schema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Título precisa ter pelo menos 3 caracteres")
        .max(120, "Título muito longo"),
    description: z
        .string()
        .trim()
        .max(500, "Descrição muito longa")
        .or(z.literal("")),
    dueDate: z
        .string()
        .or(z.literal(""))
        // se vier preenchido, precisa ser uma data válida (input type=date retorna YYYY-MM-DD)
        .refine((v) => !v || !Number.isNaN(Date.parse(v)), "Prazo inválido")
});

export type TaskFormData = z.infer<typeof schema>;

type TaskFormProps = {
    processId: string
}

export default function TaskForm({ processId }: TaskFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: ""
        },
    });

    const useCreateTask = UseCreateTask();

    async function submit(data: TaskFormData) {
        const dueDateISO = new Date(`${data.dueDate}T00:00:00.000Z`).toISOString();

        const taskRequest = {
            title: data.title,
            description: data.description,
            dueDate: dueDateISO,
            processId: processId
        }

        await useCreateTask.mutateAsync(taskRequest)
        reset({ title: "", description: "", dueDate: "" });
    }

    return (
        <div className="pfd-panel">
            <div className="pfd-panelHead">
                <div className="pfd-panelTitle">Nova tarefa</div>

                <button
                    className="pfd-btn pfd-btn--primary"
                    type="button"
                    onClick={handleSubmit(submit)}
                >
                    <FaPlus /> Adicionar
                </button>
            </div>

            <div className="pfd-panelBody">
                <div className="pfd-row">
                    <input
                        className="pfd-input"
                        placeholder="Título (ex: Solicitar documento...)"
                        {...register("title")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(submit)();
                            }
                        }}
                    />
                    {errors.title ? <div className="pfd-error">{errors.title.message}</div> : null}
                </div>

                <div className="pfd-row">
                    <textarea
                        className="pfd-input"
                        placeholder="Descrição (opcional)"
                        rows={3}
                        {...register("description")}
                    />
                    {errors.description ? <div className="pfd-error">{errors.description.message}</div> : null}
                </div>

                <div className="pfd-row">
                    <input className="pfd-input" type="date" {...register("dueDate")} />
                    {errors.dueDate ? <div className="pfd-error">{errors.dueDate.message}</div> : null}
                </div>

                <div className="pfd-helper">
                    Tarefas deixam o andamento mais previsível (e ficam ótimas pra status “Em andamento”).
                </div>
            </div>
        </div>
    );
}