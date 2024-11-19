import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import LaneViolationChart from './LaneViolationChart';
import ReverseDrivingChart from './ReverseDrivingChart';
import CenterLineViolationChart from './CenterLineViolationChart';
import { parseHelmetData, parseLaneViolationData, parseReverseDrivingData, parseCenterLineViolationData } from '../../utils';
import './ViolationList.css';
import HelmetViolationChart from './HelmetViolationChart';

const ViolationList = () => {
  const [showHelmetModal, setShowHelmetModal] = useState(false);
  const [showLaneModal, setShowLaneModal] = useState(false);
  const [showReverseDrivingModal, setShowReverseDrivingModal] = useState(false);
  const [showCenterLineModal, setShowCenterLineModal] = useState(false);
  const [helmetData, setHelmetData] = useState([]);
  const [laneData, setLaneData] = useState([]);
  const [reverseDrivingData, setReverseDrivingData] = useState([]);
  const [centerLineData, setCenterLineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
        const csvText = await response.text();
        const parsedHelmetData = parseHelmetData(csvText);
        const parsedLaneData = parseLaneViolationData(csvText, 30);
        const parsedReverseDrivingData = parseReverseDrivingData(csvText, 10);
        const parsedCenterLineData = parseCenterLineViolationData(csvText, 10);
        setHelmetData(parsedHelmetData);
        setLaneData(parsedLaneData);
        setReverseDrivingData(parsedReverseDrivingData);
        setCenterLineData(parsedCenterLineData);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHelmetShow = () => setShowHelmetModal(true);
  const handleHelmetClose = () => setShowHelmetModal(false);
  const handleLaneShow = () => setShowLaneModal(true);
  const handleLaneClose = () => setShowLaneModal(false);
  const handleReverseDrivingShow = () => setShowReverseDrivingModal(true);
  const handleReverseDrivingClose = () => setShowReverseDrivingModal(false);
  const handleCenterLineShow = () => setShowCenterLineModal(true);
  const handleCenterLineClose = () => setShowCenterLineModal(false);

  return (
    <div className="violation-list">
      <h2>위반 항목 목록</h2>
      <ul>
        <li>
          헬멧 미착용 그래프 <Button variant="outline-primary" size="sm" onClick={handleHelmetShow}>+</Button>
        </li>
        <li>
          1차선 주행 그래프 <Button variant="outline-primary" size="sm" onClick={handleLaneShow}>+</Button>
        </li>
        <li>
          역주행 그래프 <Button variant="outline-primary" size="sm" onClick={handleReverseDrivingShow}>+</Button>
        </li>
        <li>
          중앙선 침범 그래프 <Button variant="outline-primary" size="sm" onClick={handleCenterLineShow}>+</Button>
        </li>
      </ul>

      <Modal show={showHelmetModal} onHide={handleHelmetClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>헬멧 미착용 그래프</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <HelmetViolationChart data={helmetData} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHelmetClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLaneModal} onHide={handleLaneClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>1차선 주행 그래프</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <LaneViolationChart data={laneData} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLaneClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReverseDrivingModal} onHide={handleReverseDrivingClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>역주행 그래프</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <ReverseDrivingChart data={reverseDrivingData} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReverseDrivingClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCenterLineModal} onHide={handleCenterLineClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>중앙선 침범 그래프</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <CenterLineViolationChart data={centerLineData} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCenterLineClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViolationList;