import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import { GridContainer } from "./Styes";
import { useHistory } from "react-router-dom";

const projectLead = ({ data }) => {
  return <div style={{ marginLeft: "20px" }}>{data.projectLead.name}</div>;
};

const createdAt = ({ data }) => {
  const date = new Date(data.creationDate);
  return (
    <div style={{ marginLeft: "20px" }}>
      {date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}
    </div>
  );
};

const columns = [
  {
    id: 1,
    field: "name",
    label: "Name",
    width: "35%"
  },
  {
    id: 2,
    field: "key",
    label: "Key",
    width: "15%"
  },
  {
    id: 3,
    field: "creationDate",
    label: "Created At",
    width: "25%",
    cellRenderer: createdAt,
    sort: ({ a, b, isAscending }) => {
      let aa = a
          .split("/")
          .reverse()
          .join(),
        bb = b
          .split("/")
          .reverse()
          .join();
      return aa < bb
        ? isAscending
          ? -1
          : 1
        : aa > bb
        ? isAscending
          ? 1
          : -1
        : 0;
    }
  },
  {
    id: 4,
    field: "projectLead",
    label: "Lead",
    width: "25%",
    cellRenderer: projectLead
  }
];

const ProjectsTable = ({ projects, filters }) => {
  const history = useHistory();
  return (
    <GridContainer>
      <GridTable
        columns={columns}
        rows={projects}
        isPaginated={false}
        searchText={filters.searchTerm}
        showSearch={false}
        showRowsInformation={false}
        showColumnVisibilityManager={false}
        onRowClick={(
          { rowIndex, data, column, isEdit, event },
          tableManager
        ) => {
          history.push(`/project/${data.id}/board`);
        }}
      />
    </GridContainer>
  );
};

export default ProjectsTable;