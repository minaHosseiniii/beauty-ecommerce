import PageTitle from "../../components/pages/PageTitle"

const h3Style =
    "text-xl font-semibold text-primary mb-3";

const pStyle =
    "text-gray-600 dark:text-gray-300 leading-7";

const About = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-14">

            <PageTitle title="About Us" />

            <p
                className="
                    mt-8
                    text-lg
                    leading-8
                    text-center
                    text-gray-600
                    dark:text-gray-300
                    max-w-4xl
                    mx-auto
                "
            >
                Aura Cosmetics is dedicated to bringing you premium
                skincare and beauty products inspired by nature.
                We believe that beauty should be simple, elegant,
                and accessible to everyone.
            </p>

            <h2
                className="
                    text-3xl
                    font-bold
                    text-center
                    mt-16
                    mb-12
                    text-dark
                    dark:text-light
                "
            >
                Why Choose Us?
            </h2>

            <div
                className="
                    grid
                    md:grid-cols-2
                    gap-8
                "
            >
                <div
                    className="
                        bg-white
                        dark:bg-dark
                        p-8
                        rounded-2xl
                        shadow-md
                        border
                        border-gray-100
                        dark:border-gray-700
                    "
                >
                    <h3 className={h3Style}>
                        Premium Quality
                    </h3>

                    <p className={pStyle}>
                        Every product is carefully selected to
                        ensure exceptional quality and customer
                        satisfaction.
                    </p>
                </div>

                <div
                    className="
                        bg-white
                        dark:bg-dark
                        p-8
                        rounded-2xl
                        shadow-md
                        border
                        border-gray-100
                        dark:border-gray-700
                    "
                >
                    <h3 className={h3Style}>
                        Natural Ingredients
                    </h3>

                    <p className={pStyle}>
                        We prioritize clean and natural ingredients
                        that nourish and protect your skin.
                    </p>
                </div>

                <div
                    className="
                        bg-white
                        dark:bg-dark
                        p-8
                        rounded-2xl
                        shadow-md
                        border
                        border-gray-100
                        dark:border-gray-700
                    "
                >
                    <h3 className={h3Style}>
                        Fast Delivery
                    </h3>

                    <p className={pStyle}>
                        Enjoy quick and reliable delivery so your
                        favorite products reach you on time.
                    </p>
                </div>

                <div
                    className="
                        bg-white
                        dark:bg-dark
                        p-8
                        rounded-2xl
                        shadow-md
                        border
                        border-gray-100
                        dark:border-gray-700
                    "
                >
                    <h3 className={h3Style}>
                        Customer First
                    </h3>

                    <p className={pStyle}>
                        Our team is committed to providing excellent
                        service and helping you find products that
                        suit your needs.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;