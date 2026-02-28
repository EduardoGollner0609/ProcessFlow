export default function EmptyState({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
    return (
        <div className="pfd-emptyState">
            <div className="pfd-emptyIcon" aria-hidden="true">
                {icon}
            </div>
            <div className="pfd-emptyTitle">{title}</div>
            <div className="pfd-emptySub">{subtitle}</div>
        </div>
    );
}