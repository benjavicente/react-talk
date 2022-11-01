type PropsWithChildren<P = {}> = React.PropsWithChildren<P>;

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
