import TodoPage from "../features/todo/TodoPage";

const routeList = [
  'HOME'
] as const

type RouteKey = typeof routeList[number];

type RouteDataProps = {
  [key in RouteKey]: {
    title: string;
    link: string;
    Comp: () => React.ReactNode;
  }
}

export const RoutesData: RouteDataProps = {
  HOME: {
    title: 'Home',
    link: 'home',
    Comp: () => <TodoPage/>
  }
}