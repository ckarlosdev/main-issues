import {  Issue, IssueCreate } from "../types";
import { submitIssueURL } from "./urls";
import useHttpData from "./useHttpData";

export default () => {
  const {
    data: submitAnswer,
    loading: submitLoading,
    error: submitError,
    postData: submit,
    putData: update,
  } = useHttpData<Issue>();

  const submitData = (values: IssueCreate): Promise<Issue | undefined> => {
    return submit(submitIssueURL(), values);
  };

  const updateData = (values: IssueCreate): Promise<Issue | undefined> => {
    return update(submitIssueURL(), values);
  };

  return {
    submitAnswer,
    submitLoading,
    submitError,
    submitData,
    updateData,
  };
};
