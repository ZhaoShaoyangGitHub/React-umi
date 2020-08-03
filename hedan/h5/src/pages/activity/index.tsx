import React from "react";
import {Route, Switch} from "react-router-dom";

import draw from "./draw";
import guardians from "./guardians";
import progress_check from "./progress_check";
import task from "./task";

import draw_next from "./next_active/draw";
import guardians_next from "./next_active/guardians";
import progress_check_next from "./next_active/progress_check";
import task_next from "./next_active/task";

import {ACTIVITYCODE} from "./active_config";

import LoadingPage from "@/components/LoadingPage";

import {ajax_json} from "@/utils/http";

export default class Demo extends React.Component<props> {
  state = {
    isGotoActive: false,
    routerList: [
      {
        component: draw,
        exact: true,
        path: "/activity/draw",
      },
      {
        component: guardians,
        exact: true,
        path: "/activity/guardians",
      },
      {
        component: progress_check,
        exact: true,
        path: "/activity/progress_check",
      },
      {
        component: task,
        exact: true,
        path: "/activity/task",
      },
    ],
  };

  switch_next_active = () => {
    const {routerList} = this.state;
    routerList[0].component = draw_next;
    routerList[1].component = guardians_next;
    routerList[2].component = progress_check_next;
    routerList[3].component = task_next;
    this.setState({
      routerList,
    });
  };

  componentDidMount() {
    this.setState({
      isGotoActive: false,
    });
    ajax_json({
      url: "/api/activity/next",
      data: {
        activityCode: ACTIVITYCODE,
      },
      method: "get",
    }).then((res: any) => {
      if (res.code === "OK") {
        if (res.data.isJump) {
          this.switch_next_active();
        }
      }
      this.setState({
        isGotoActive: true,
      });
    });
  }

  render() {
    const {routerList, isGotoActive} = this.state;

    if (!isGotoActive) {
      return <LoadingPage status={true} />;
    }
    return (
      <div>
        {routerList.map((item, index) => {
          return (
            <Route
              key={index}
              exact={item.exact}
              path={item.path}
              component={item.component}
            />
          );
        })}
      </div>
    );

    // <RouterView path={match.path} />;
  }
}
