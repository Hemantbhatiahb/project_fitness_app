import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import PageContent from "../components/error/PageContent";

function ErrorPage() {
  let title = "An Error Occured!";
  let message = "Something went wrong!";
  const error = useRouteError();

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find page!";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title} message={message}></PageContent>
    </>
  );
}

export default ErrorPage;
