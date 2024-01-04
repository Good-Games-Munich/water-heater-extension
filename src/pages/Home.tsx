import logo from '@/assets/logo.svg';

export const Home = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-[750px]">
        <img alt="Logo" className="m-auto my-10" src={logo} width={150} />
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            {chrome.i18n.getMessage('homeTitle')}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
            {chrome.i18n.getMessage('homeDescription')}
        </p>
    </div>
);
