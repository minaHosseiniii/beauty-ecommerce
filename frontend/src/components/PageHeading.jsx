import PageTitle from "./PageTitle";

export default function PageHeading({ title, children }) {
    return (
        <section className="text-center py-10 mb-10">
            <PageTitle title={title} />

            <div className="mt-5 max-w-2xl mx-auto text-stone-600 font-primary leading-7">
                {children}
            </div>
        </section>
    );
}