import React from "react";
import { Col, Input, Row } from "antd";

import "./DashboardHeader.scss";

export interface IGlobalStatistics {
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

export interface IDashboardHeaderProps {
  searchTerm: string;
  globalStatistics: IGlobalStatistics;
  onSearchTermChange: (value: string) => void;
}

const DashboardHeader: React.FC<IDashboardHeaderProps> = (props): JSX.Element => {
  return (
    <Row className="dashboard-header" data-testid="dashboard-header" gutter={ [24, 12] } align="bottom">
      <Col md={ 3 }>
        <Input placeholder="Search for country..." value={ props.searchTerm } onChange={ ({ target: { value } }) => props.onSearchTermChange(value) } />
      </Col>
    </Row>
  );
};

export default DashboardHeader;
