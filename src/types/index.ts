export type Issue = {
  equipmentsIssuesId: number;
  equipmentNumber: string;
  equipmentName: string;
  flow: string;
  reportedBy: string;
  reportedDate: string;
  priorityIssue: string;
  typeIssue: string;
  descriptionIssue: string;
  details: string;
  createdBy: string;
  updatedBy: string;
  comments: string;
};

export type IssueCreate = {
  equipmentsIssuesId: number;
  checklistsId: number;
  equipmentsId: number;
  flow: string;
  reportedBy: string;
  reportedDate: string;
  priorityIssue: string;
  typeIssue: string;
  descriptionIssue: string;
  details: string;
  createdBy: string;
  updatedBy: string;
};

export type Equipment = {
  equipmentsId: number;
  number: string;
  name: string;
  serialNumber: string;
  hour: number;
};

export type Employee = {
  employeesId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  status: string;
  title: string;
};
