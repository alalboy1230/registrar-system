import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../adminPage/components/navbar/Navbar";
import Sidebar from "../../../adminPage/components/sidebar/Sidebar";
import Widget from "../../../adminPage/components/widgets/Widget";
import WDFprofile from "../../../adminPage/components/wdfprofile/WDFprofile";
import DataTable from "../../../adminPage/components/DataTable/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import { filterID } from "../../../signatoriesPage/pages/dashboard/Dashboard";
import { CgClose } from "react-icons/cg";
import { BsArrowUpShort } from "react-icons/bs";

import axios from "axios";

function RequestWDF() {
  const [pending, setPending] = useState("");
  const [approved, setApproved] = useState("");
  const [declined, setDeclined] = useState("");
  const [pendingRequest, setPendingRequest] = useState([]);
  const [approvedRequest, setApprovedRequest] = useState([]);
  const [declinedRequest, setDeclineRequest] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const [showApproved, setShowApproved] = useState(false);
  const [showDeclined, setShowDeclined] = useState(false);
  const [showTable, setShowtable] = useState(true);
  const [allData, setAlldata] = useState([]);
  const [filterData, setFilteredData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const Data = [
    {
      id: 1,
      title: "Total Pending",
      totalAmount: pending,
      link: "#",
      newData: 0,
      linkTitle: "See all Pending",
    },
    {
      id: 2,
      title: "Total Approved",
      totalAmount: approved,
      link: "#",
      newData: 0,
      linkTitle: "See all Approved",
    },
    {
      id: 3,
      title: "Total Declined",
      totalAmount: declined,
      link: "#",
      newData: 2,
      linkTitle: "See all Declined",
    },
  ];

  const myDivRef = useRef(null);
  const myTableDiv = useRef(null);
  const myWidgetDiv = useRef(null);
  const handleCheckboxChange = (value, type) => {
    if (type === 1) {
      myTableDiv.current.scrollIntoView({ behavior: "smooth" });
      setShowPending(true);
      setShowApproved(false);
      setShowDeclined(false);
      setShowtable(true);
    } else if (type === 2) {
      myTableDiv.current.scrollIntoView({ behavior: "smooth" });
      setShowApproved(true);
      setShowDeclined(false);
      setShowPending(false);
      setShowtable(true);
    } else if (type === 3) {
      myTableDiv.current.scrollIntoView({ behavior: "smooth" });
      setShowDeclined(true);
      setShowApproved(false);
      setShowPending(false);
      setShowtable(true);
    } else {
      setShowDeclined(false);
      setShowApproved(false);
      setShowPending(false);
      setShowtable(true);
    }
  };
  const site = useLocation();
  const approveRequestWDF = async (id, type) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/signatories/request/WDF/${id}`,
        { adminNote: "APPROVED" }
      );
      if (type === 1) {
        setApproved(approved + 1);
        setPending(pending - 1);
      } else {
        setApproved(approved + 1);
        setDeclined(declined - 1);
      }
      console.log(res.data);
      setPendingRequest(pendingRequest.filter((item) => item.id !== id));
      setDeclineRequest(declinedRequest.filter((item) => item.id !== id));
      setApprovedRequest(approvedRequest.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const declinedRequestWDF = async (id, type) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/signatories/request/WDF/${id}`,
        { adminNote: "DECLINED" }
      );
      if (type === 2) {
        setDeclined(declined + 1);
        setPending(pending - 1);
      }
      console.log(res.data);
      setPendingRequest(pendingRequest.filter((item) => item.id !== id));
      setDeclineRequest(declinedRequest.filter((item) => item.id !== id));
      setApprovedRequest(approvedRequest.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const viewRequest = (id) => {
    const userData = allData.filter((item) => item.id === id);
    myDivRef.current.scrollIntoView({ behavior: "smooth" });
    setFilteredData(userData);
    setShowForm(true);
  };

  const formClose = () => {
    setShowForm(false);

    myWidgetDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  const pendingColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <div
              className="columnView"
              onClick={() => {
                viewRequest(params.row.id);
              }}
            >
              View
            </div>
            <div
              className="columnApprove"
              onClick={() => approveRequestWDF(params.row.id, 1)}
            >
              Approve
            </div>
            <div
              className="columnDecline"
              onClick={() => declinedRequestWDF(params.row.id, 2)}
            >
              Decline
            </div>
          </div>
        );
      },
      headerStyle: { textAlign: "center" },
    },
  ];

  const approvedColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <div
              className="columnView"
              onClick={() => {
                viewRequest(params.row.id);
              }}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];

  const declinedColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <div
              className="columnView"
              onClick={() => {
                viewRequest(params.row.id);
              }}
            >
              View
            </div>
            <div
              className="columnApprove"
              onClick={() => approveRequestWDF(params.row.id, 2)}
            >
              Approve
            </div>
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/signatories/status/documentStatus/wdf"
        );
        setPending(res.data[0] ? res.data[0] : 0);
        setApproved(res.data[1] ? res.data[1] : 0);
        setDeclined(res.data[2] ? res.data[2] : 0);
      } catch (err) {
        console.log(err);
        navigate("/admin/login");
      }
    };

    fetchData();
  }, [site, navigate]);

  useEffect(() => {
    const fetchData = () => {
      const pendingData = allData.filter(
        (item) => item.approvals === "PENDING"
      );
      setPendingRequest(pendingData);
      const approvedData = allData.filter(
        (item) => item.approvals === "APPROVED"
      );
      setApprovedRequest(approvedData);
      const declinedData = allData.filter(
        (item) => item.approvals === "DECLINED"
      );
      setDeclineRequest(declinedData);
    };

    fetchData();
  }, [site, allData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/signatories/request/getAllRequestWDF"
        );
        setAlldata(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [site, navigate]);

  const data = [
    {
      id: 1,
      link: "/signatories/requests/cfrd",
      title: "REQUISITION OF DOCUMENTS",
    },
    {
      id: 2,
      link: "/signatories/request/wdf",
      title: "WITHDRAWAL FORM",
    },
    {
      id: 3,
      link: "/signatories/request/hd",
      title: "HONORABLE DISMISSAL",
    },
  ];

  const filterLink = [];
  if (filterID) {
    for (let i = 0; i < filterID.length; i++) {
      const links = data.find((item) => item.id === filterID[i].id);
      if (links) {
        filterLink.push(links);
      }
    }
  }

  return (
    <div className="admin-requests-container">
      <Sidebar
        myProps1="/signatories/dashboards"
        myProps2="/signatories/home"
        myProps6="/admin/login"
        DATA={filterLink}
      />

      <div className="admin-requests-wrapper">
        <Navbar />
        <div className="admin-requests-top" ref={myWidgetDiv}>
          <h1>WITHDRAWAL FORM</h1>
          <div className="admin-requests-widget">
            {Data.map((data) => (
              <Widget {...data} key={data.id} onClick={handleCheckboxChange} />
            ))}
          </div>
        </div>

        <div className="admin-requests-middle" ref={myTableDiv}>
          <div className="admin-request-iconClose">
            <BsArrowUpShort className="admin-request-btn" onClick={formClose} />
          </div>
          {showTable && (
            <div>
              {showPending && (
                <DataTable
                  props={pendingRequest}
                  className="admin-request-table"
                  title="PENDING REQUEST"
                  actionColumn={pendingColumn}
                />
              )}
              {showApproved && (
                <DataTable
                  props={approvedRequest}
                  className="admin-request-table"
                  title="APPROVED REQUEST"
                  actionColumn={approvedColumn}
                />
              )}
              {showDeclined && (
                <DataTable
                  props={declinedRequest}
                  title="DECLINED REQUEST"
                  className="admin-request-table"
                  actionColumn={declinedColumn}
                />
              )}
            </div>
          )}
        </div>
        <div className="admin-request-bottom-container" ref={myDivRef}>
          {showForm && (
            <div className="admin-request-bottom">
              <div className="admin-request-iconClose">
                <CgClose className="admin-request-btn" onClick={formClose} />
              </div>
              <WDFprofile props={filterData} />
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default RequestWDF;
