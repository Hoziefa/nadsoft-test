import React, {useMemo} from "react";
import {Col, Input, Row, Tag, Typography} from "antd";

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
  const formatter = useMemo((): Intl.NumberFormat => Intl.NumberFormat("en", {notation: "compact"}), []);

  return (
    <Row className="dashboard-header" data-testid="dashboard-header" gutter={[24, 12]} align="bottom">
      <Col md={8}>
        <Typography.Text strong className="dashboard-header__title">Global Statistics:</Typography.Text>

        <Tag color="blue">Confirmed: {formatter.format(props.globalStatistics.totalConfirmed)}</Tag>

        <Tag color="red">Death: {formatter.format(props.globalStatistics.totalDeaths)}</Tag>

        <Tag color="green">Recovered: {formatter.format(props.globalStatistics.totalRecovered)}</Tag>
      </Col>

      <Col md={8}>
        <Input placeholder="Search for country..." value={props.searchTerm} onChange={({target: {value}}): void => props.onSearchTermChange(value)} />
      </Col>
    </Row>
  );
};

export default DashboardHeader;
