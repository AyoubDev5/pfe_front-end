import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./materiel.css";
import { URL_SPRING_API } from "../../Constant";
import {
  Chart as ChartJS,

  BarElement,
  CategoryScale, 
  BarController,
  LinearScale

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  BarController, 
  LinearScale,
);

export default class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materiel: {},
      materiels: [],
      idMateriel: 1,
      type_materiel: "",
      prix_unitaire: "",
      quantite: "",
      productData: [
        {
          name: "مارس",
          Sales: 7,
        },
        {
          name: "ابريل",
          Sales: 7,
        },
        {
          name: "ماي",
          Sales: 20,
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get(
        URL_SPRING_API + `/materielById/${this.props.match.params.idMateriel}`
      )
      .then((res) => {
        this.setState({
          materiel: res.data,
          idMateriel: res.data.idMateriel,
          type_materiel: res.data.type_materiel,
          prix_unitaire: res.data.prix_unitaire,
          quantite: res.data.quantite,
        });
        // console.log("materiel:res.data", res.data);
      });
  }
  submit(event) {
    event.preventDefault();
    axios
      .put(URL_SPRING_API + "/updateMateriel", {
        idMateriel: this.state.idMateriel,
        type_materiel: this.state.type_materiel,
        prix_unitaire: this.state.prix_unitaire,
        quantite: this.state.quantite,
        // projet: {
        //   idProjet: this.props.match.params.idProjet,
        //   nomProjet: this.state.projet.nomProjet,
        //   dateDebut: this.state.projet.dateDebut,
        //   dateFin: this.state.projet.dateFin,
        // },
      })
      .then(() => {
        this.componentDidMount();
      });
  }

  render() {
    const { idMateriel, type_materiel, quantite, prix_unitaire } =
      this.state.materiel;
      // console.log("materiel:res.data",  this.state.materiel);
      
  var data = {
    labels:  this.state.materiel.type_materiel,
    datasets: [{
      label: `Type des Materiels avec le Prix`,
      data:  [this.state.materiel.prix_unitaire] ,
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    }]
  };
  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
    return (
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">المواد</h1>
          <Link
            to={`/${this.props.match.params.idProjet}/${this.props.match.params.idTache}/addmateriel`}
          >
            <button className="productAddButton">اضافة</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Bar
              data={data}
              height={250}
              width={100}
              options={options}
            />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <span className="productName">{type_materiel}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{idMateriel}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">الكمية:</span>
                <span className="productInfoValue">{quantite}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">ثمن الوحدة</span>
                <span className="productInfoValue">{prix_unitaire}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">الثمن</span>
                <span className="productInfoValue">
                  {quantite * prix_unitaire}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm" onSubmit={(e) => this.submit(e)}>
            <div className="productFormLeft">
              <label>المادة المستعملة</label>
              <input
                type="text"
                placeholder=""
                onChange={(e) =>
                  this.setState({ type_materiel: e.target.value })
                }
                value={this.state.type_materiel}
              />
              <label>الكمية</label>
              <input
                type="text"
                placeholder=""
                onChange={(e) => this.setState({ quantite: e.target.value })}
                value={this.state.quantite}
              />
              <label>الثمن</label>
              <input
                type="text"
                placeholder=""
                onChange={(e) =>
                  this.setState({ prix_unitaire: e.target.value })
                }
                value={this.state.prix_unitaire}
              />
            </div>
            <div className="productFormRight">
              <button className="productButton">تحديث</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
