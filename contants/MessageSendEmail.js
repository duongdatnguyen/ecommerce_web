const Order=require("../models/Order");;


module.exports.createMessage=async function createMessage(order){
  const orderEmail=await Order.findById(order).populate({path:"items",populate: { path: "productId", select: ["name", "price","imageMain"] }}).populate({path:"userId",select: ["fistname", "lastname","email"]});
    const messageBegin=`<table
    class="nl-container"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #e1f0f1"
  >
    <tbody>
      <tr>
        <td>
          <table
            class="row row-1"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              background-color: #e8e2dd;
            "
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content stack"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="100%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <div
                            class="spacer_block"
                            style="
                              height: 35px;
                              line-height: 35px;
                              font-size: 1px;
                            "
                          >
                            &#8202;
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="row row-2"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              background-color: #e8e2dd;
              background-image: url(https://d1oco4z2z1fhwp.cloudfront.net/templates/default/5056/bg_hero.png);
              background-repeat: no-repeat;
              background-position: center top;
            "
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content stack"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="100%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <table
                            class="icons_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  vertical-align: middle;
                                  color: #000;
                                  text-align: center;
                                  font-family: inherit;
                                  font-size: 14px;
                                  padding-top: 35px;
                                "
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  align="center"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                                >
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        text-align: center;
                                        padding-top: 5px;
                                        padding-bottom: 15px;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                      "
                                    >
                                      <img
                                        class="icon"
                                        src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/5056/Logo_wellness_1.png"
                                        alt="Company Logo"
                                        height="64"
                                        width="62"
                                        align="center"
                                        style="
                                          display: block;
                                          height: auto;
                                          margin: 0 auto;
                                          border: 0;
                                        "
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table
                            class="heading_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  width: 100%;
                                  text-align: center;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #010101;
                                    font-size: 40px;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    line-height: 120%;
                                    text-align: center;
                                    direction: ltr;
                                    font-weight: 400;
                                    letter-spacing: normal;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Thank you</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            class="heading_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  width: 100%;
                                  text-align: center;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #010101;
                                    font-size: 39px;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    line-height: 120%;
                                    text-align: center;
                                    direction: ltr;
                                    font-weight: 400;
                                    letter-spacing: normal;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Your order successfully</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            class="heading_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  width: 100%;
                                  text-align: center;
                                  padding-right: 10px;
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #010101;
                                    font-size: 40px;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    line-height: 120%;
                                    text-align: center;
                                    direction: ltr;
                                    font-weight: 400;
                                    letter-spacing: normal;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>been placed.</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            class="button_block"
                            width="100%"
                            border="0"
                            cellpadding="10"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td>
                                <div align="center">
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:44px;width:213px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#010101" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#010101; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                  <a
                                    href="www.example.com"
                                    target="_blank"
                                    style="
                                      text-decoration: none;
                                      display: inline-block;
                                      color: #010101;
                                      background-color: transparent;
                                      border-radius: 4px;
                                      width: auto;
                                      border-top: 1px solid #010101;
                                      font-weight: undefined;
                                      border-right: 1px solid #010101;
                                      border-bottom: 1px solid #010101;
                                      border-left: 1px solid #010101;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      text-align: center;
                                      mso-border-alt: none;
                                      word-break: keep-all;
                                    "
                                    ><span
                                      style="
                                        padding-left: 40px;
                                        padding-right: 40px;
                                        font-size: 16px;
                                        display: inline-block;
                                        letter-spacing: normal;
                                      "
                                      ><span
                                        style="
                                          font-size: 16px;
                                          line-height: 2;
                                          word-break: break-word;
                                          mso-line-height-alt: 32px;
                                        "
                                        >View Order Status</span
                                      ></span
                                    ></a
                                  >
                                  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table
                            class="image_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  width: 100%;
                                  padding-top: 20px;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                "
                              >
                                <div align="center" style="line-height: 10px">
                                  <img
                                    class="fullMobileWidth big"
                                    src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/5056/confrimed_stamp_middle_1.png"
                                    style="
                                      display: block;
                                      height: auto;
                                      border: 0;
                                      width: 272px;
                                      max-width: 100%;
                                    "
                                    width="272"
                                    alt="Skin Care"
                                    title="Skin Care"
                                  />
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="row row-3"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              background-color: #e8e2dd;
            "
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content stack"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="100%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <div
                            class="spacer_block"
                            style="
                              height: 35px;
                              line-height: 35px;
                              font-size: 1px;
                            "
                          >
                            &#8202;
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="row row-4"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="mso-table-lspace: 0; mso-table-rspace: 0"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content stack"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="100%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <table
                            class="heading_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0; mso-table-rspace: 0"
                          >
                            <tr>
                              <td
                                style="
                                  width: 100%;
                                  text-align: center;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                  padding-top: 35px;
                                  padding-bottom: 25px;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #010101;
                                    font-size: 34px;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    line-height: 120%;
                                    text-align: center;
                                    direction: ltr;
                                    font-weight: 400;
                                    letter-spacing: normal;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Order Summary</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="row row-5"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="mso-table-lspace: 0; mso-table-rspace: 0"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="41.666666666666664%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <table
                            class="text_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              word-break: break-word;
                            "
                          >
                            <tr>
                              <td
                                style="
                                  padding-top: 15px;
                                  padding-right: 10px;
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class="txtTinyMce-wrapper"
                                    style="
                                      font-size: 14px;
                                      mso-line-height-alt: 21px;
                                      color: #cc835c;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 24px;
                                      "
                                    >
                                      <span style="font-size: 16px"
                                        >Order #90920</span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-2"
                          width="58.333333333333336%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <table
                            class="text_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              word-break: break-word;
                            "
                          >
                            <tr>
                              <td
                                style="
                                  padding-top: 15px;
                                  padding-right: 10px;
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class="txtTinyMce-wrapper"
                                    style="
                                      font-size: 14px;
                                      mso-line-height-alt: 21px;
                                      color: #cc835c;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: right;
                                        mso-line-height-alt: 24px;
                                      "
                                    >
                                      <span style="font-size: 16px"
                                        >1.11.2021 11.15</span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="row row-12"
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="mso-table-lspace: 0; mso-table-rspace: 0"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    class="row-content"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      color: #000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          width="41.666666666666664%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <table
                            class="text_block"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              word-break: break-word;
                            "
                          >
                            <tr>
                              <td
                                style="
                                  padding-top: 15px;
                                  padding-right: 10px;
                                  padding-bottom: 15px;
                                  padding-left: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class="txtTinyMce-wrapper"
                                    style="
                                      font-size: 14px;
                                      mso-line-height-alt: 21px;
                                      color: #cc835c;
                                      line-height: 1.5;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                      "
                                    >
                                      <strong
                                        ><span style="font-size: 16px"
                                          >Order Summary</span
                                        ></strong
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-2"
                          width="58.333333333333336%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            font-weight: 400;
                            text-align: left;
                            vertical-align: top;
                            border-top: 0;
                            border-right: 0;
                            border-bottom: 0;
                            border-left: 0;
                          "
                        >
                          <div
                            class="spacer_block"
                            style="height: 10px; line-height: 5px; font-size: 1px"
                          >
                            &#8202;
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>`;
  const message={ // thiết lập đối tượng, nội dung gửi mail
        from: 'Ecomerce web',
        to: orderEmail.userId.email,
        subject: 'Order success',
        text: "You recieved message from",
        html: messageBegin+
              await this.createmailItem(orderEmail)+
              this.tableOrderPrice(orderEmail.totalPrice,"10000")
              
    }
    return message;
};

module.exports.createmailItem=function(order)
{
  let message= "";
  for (let item of order.items)
  {
    console.log(item);
    message+= `<table
    class="row row-6"
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="
      mso-table-lspace: 0;
      mso-table-rspace: 0;
      background-position: center top;
    "
  >
    <tbody>
      <tr>
        <td>
          <table
            class="row-content stack"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              mso-table-lspace: 0;
              mso-table-rspace: 0;
              background-color: #cfdddf;
              color: #000;
              width: 680px;
            "
            width="680"
          >
            <tbody>
              <tr>
                <td
                  class="column column-1"
                  width="25%"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    font-weight: 400;
                    text-align: left;
                    vertical-align: top;
                    background-color: #b2c1c3;
                    border-top: 0;
                    border-right: 0;
                    border-bottom: 0;
                    border-left: 0;
                  "
                >
                  <table
                    class="image_block"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="mso-table-lspace: 0; mso-table-rspace: 0"
                  >
                    <tr>
                      <td
                        style="
                          width: 100%;
                          padding-right: 0;
                          padding-left: 0;
                          padding-top: 25px;
                          padding-bottom: 25px;
                        "
                      >
                        <div align="center" style="line-height: 10px">
                          <img
                            class="fullMobileWidth big"
                            src=${item.productId.imageMain}
                            style="
                              display: block;
                              height: auto;
                              border: 0;
                              width: 136px;
                              max-width: 100%;
                            "
                            width="136"
                            alt=${item.productId}
                            title=${item.productId.name}
                          />
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td
                  class="column column-2"
                  width="41.666666666666664%"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    font-weight: 400;
                    text-align: left;
                    vertical-align: top;
                    border-top: 0;
                    border-right: 0;
                    border-bottom: 0;
                    border-left: 0;
                  "
                >
                  <table
                    class="heading_block"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="mso-table-lspace: 0; mso-table-rspace: 0"
                  >
                    <tr>
                      <td
                        style="
                          width: 100%;
                          text-align: center;
                          padding-right: 10px;
                          padding-bottom: 10px;
                          padding-left: 15px;
                          padding-top: 35px;
                        "
                      >
                        <h1
                          style="
                            margin: 0;
                            color: #010101;
                            font-size: 24px;
                            font-family: Arial, Helvetica Neue, Helvetica,
                              sans-serif;
                            line-height: 120%;
                            text-align: left;
                            direction: ltr;
                            font-weight: 400;
                            letter-spacing: normal;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <strong>${item.productId.name}</strong>
                        </h1>
                        <h1
                          style="
                            margin: 0;
                            color: #010101;
                            font-size: 24px;
                            font-family: Arial, Helvetica Neue, Helvetica,
                              sans-serif;
                            line-height: 120%;
                            text-align: left;
                            direction: ltr;
                            font-weight: 400;
                            letter-spacing: normal;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                        <strong>Size :${item.sizeName}</strong>
                        </h1>
                        <h1
                          style="
                            margin: 0;
                            color: #010101;
                            font-size: 24px;
                            font-family: Arial, Helvetica Neue, Helvetica,
                              sans-serif;
                            line-height: 120%;
                            text-align: left;
                            direction: ltr;
                            font-weight: 400;
                            letter-spacing: normal;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                        <strong>Quantity: ${item.quantity}</strong>
                        </h1>
                      </td>
                    </tr>
                  </table>
                  <table
                    class="text_block"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      mso-table-lspace: 0;
                      mso-table-rspace: 0;
                      word-break: break-word;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding-top: 10px;
                          padding-right: 10px;
                          padding-bottom: 15px;
                          padding-left: 15px;
                        "
                      >
                        <div style="font-family: sans-serif">
                          <div
                            class="txtTinyMce-wrapper"
                            style="
                              font-size: 14px;
                              mso-line-height-alt: 21px;
                              color: #393d47;
                              line-height: 1.5;
                              font-family: Arial, Helvetica Neue,
                                Helvetica, sans-serif;
                            "
                          >
                            <p
                              style="
                                margin: 0;
                                font-size: 14px;
                                text-align: left;
                              "
                            >
                            Quantity: ${item.quantity}
                            </p>
                            <p
                              style="
                                margin: 0;
                                font-size: 14px;
                                text-align: left;
                              "
                            >
                            Size :${item.sizeName}
                            </p>
                            <p
                              style="
                                margin: 0;
                                font-size: 14px;
                                text-align: left;
                              "
                            >
                             Color: ${item.colorName}
                            </p>
                            
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td
                  class="column column-3"
                  width="16.666666666666668%"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    font-weight: 400;
                    text-align: left;
                    vertical-align: top;
                    border-top: 0;
                    border-right: 0;
                    border-bottom: 0;
                    border-left: 0;
                  "
                >
                  <div
                    class="spacer_block"
                    style="height: 10px; line-height: 5px; font-size: 1px"
                  >
                    &#8202;
                  </div>
                </td>
                <td
                  class="column column-4"
                  width="16.666666666666668%"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    font-weight: 400;
                    text-align: left;
                    vertical-align: top;
                    border-top: 0;
                    border-right: 0;
                    border-bottom: 0;
                    border-left: 0;
                  "
                >
                  <table
                    class="heading_block"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="mso-table-lspace: 0; mso-table-rspace: 0"
                  >
                    <tr>
                      <td
                        style="
                          width: 100%;
                          text-align: center;
                          padding-right: 10px;
                          padding-bottom: 20px;
                          padding-left: 10px;
                          padding-top: 40px;
                        "
                      >
                        <h1
                          style="
                            margin: 0;
                            color: #010101;
                            font-size: 18px;
                            font-family: Arial, Helvetica Neue, Helvetica,
                              sans-serif;
                            line-height: 120%;
                            text-align: left;
                            direction: ltr;
                            font-weight: 400;
                            letter-spacing: normal;
                            margin-top: 0;
                            margin-bottom: 0;
                          "
                        >
                          <strong>${item.totalPrice}</strong>
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>`;

  }
  //console.log(message);
  return message;
}

module.exports.tableOrderPrice=function (totalPrice,ShippingPrice){
  let message=  `<table
  class="row row-13"
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="mso-table-lspace: 0; mso-table-rspace: 0"
>
  <tbody>
    <tr>
      <td>
        <table
          class="row-content"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            color: #000;
            width: 680px;
          "
          width="680"
        >
          <tbody>
            <tr>
              <td
                class="column column-1"
                width="41.666666666666664%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="text_block"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    word-break: break-word;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding-top: 15px;
                        padding-right: 10px;
                        padding-bottom: 10px;
                        padding-left: 10px;
                      "
                    >
                      <div style="font-family: sans-serif">
                        <div
                          class="txtTinyMce-wrapper"
                          style="
                            font-size: 14px;
                            mso-line-height-alt: 21px;
                            color: #010101;
                            line-height: 1.5;
                            font-family: Arial, Helvetica Neue,
                              Helvetica, sans-serif;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              text-align: left;
                              mso-line-height-alt: 24px;
                            "
                          >
                            <span style="font-size: 16px"
                              >Total price</span
                            >
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
              <td
                class="column column-2"
                width="58.333333333333336%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="text_block"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    word-break: break-word;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding-top: 15px;
                        padding-right: 10px;
                        padding-bottom: 10px;
                        padding-left: 10px;
                      "
                    >
                      <div style="font-family: sans-serif">
                        <div
                          class="txtTinyMce-wrapper"
                          style="
                            font-size: 14px;
                            mso-line-height-alt: 21px;
                            color: #010101;
                            line-height: 1.5;
                            font-family: Arial, Helvetica Neue,
                              Helvetica, sans-serif;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              text-align: right;
                              mso-line-height-alt: 24px;
                            "
                          >
                            <span style="font-size: 16px">${totalPrice}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table
  class="row row-14"
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="mso-table-lspace: 0; mso-table-rspace: 0"
>
  <tbody>
    <tr>
      <td>
        <table
          class="row-content stack"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            color: #000;
            width: 680px;
          "
          width="680"
        >
          <tbody>
            <tr>
              <td
                class="column column-1"
                width="100%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  padding-top: 0;
                  padding-bottom: 0;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="divider_block"
                  width="100%"
                  border="0"
                  cellpadding="10"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                >
                  <tr>
                    <td>
                      <div align="center">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          width="100%"
                          style="
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                          "
                        >
                          <tr>
                            <td
                              class="divider_inner"
                              style="
                                font-size: 1px;
                                line-height: 1px;
                                border-top: 1px solid #bbb;
                              "
                            >
                              <span>&#8202;</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table
  class="row row-15"
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="mso-table-lspace: 0; mso-table-rspace: 0"
>
  <tbody>
    <tr>
      <td>
        <table
          class="row-content"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            color: #000;
            width: 680px;
          "
          width="680"
        >
          <tbody>
            <tr>
              <td
                class="column column-1"
                width="41.666666666666664%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="text_block"
                  width="100%"
                  border="0"
                  cellpadding="10"
                  cellspacing="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    word-break: break-word;
                  "
                >
                  <tr>
                    <td>
                      <div style="font-family: sans-serif">
                        <div
                          class="txtTinyMce-wrapper"
                          style="
                            font-size: 14px;
                            mso-line-height-alt: 21px;
                            color: #010101;
                            line-height: 1.5;
                            font-family: Arial, Helvetica Neue,
                              Helvetica, sans-serif;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              text-align: left;
                              mso-line-height-alt: 24px;
                            "
                          >
                            <span style="font-size: 16px">Shipping price</span>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
              <td
                class="column column-2"
                width="58.333333333333336%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="text_block"
                  width="100%"
                  border="0"
                  cellpadding="10"
                  cellspacing="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    word-break: break-word;
                  "
                >
                  <tr>
                    <td>
                      <div style="font-family: sans-serif">
                        <div
                          class="txtTinyMce-wrapper"
                          style="
                            font-size: 14px;
                            mso-line-height-alt: 21px;
                            color: #010101;
                            line-height: 1.5;
                            font-family: Arial, Helvetica Neue,
                              Helvetica, sans-serif;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              text-align: right;
                              mso-line-height-alt: 24px;
                            "
                          >
                            <span style="font-size: 16px">${ShippingPrice}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table
  class="row row-23"
  align="center"
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="mso-table-lspace: 0; mso-table-rspace: 0"
>
  <tbody>
    <tr>
      <td>
        <table
          class="row-content stack"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            color: #000;
            width: 680px;
          "
          width="680"
        >
          <tbody>
            <tr>
              <td
                class="column column-1"
                width="100%"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  font-weight: 400;
                  text-align: left;
                  vertical-align: top;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  border-top: 0;
                  border-right: 0;
                  border-bottom: 0;
                  border-left: 0;
                "
              >
                <table
                  class="icons_block"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0; mso-table-rspace: 0"
                >
                  <tr>
                    <td
                      style="
                        vertical-align: middle;
                        color: #9d9d9d;
                        font-family: inherit;
                        font-size: 15px;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        text-align: center;
                      "
                    >
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="mso-table-lspace: 0; mso-table-rspace: 0"
                      >
                        <tr>
                          <td
                            style="
                              vertical-align: middle;
                              text-align: center;
                            "
                          >
                            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                            <!--[if !vml]><!--><table
                              class="icons-inner"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                display: inline-block;
                                margin-right: -4px;
                                padding-left: 0;
                                padding-right: 0;
                              "
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            ><!--<![endif]-->
                              <tr>
                                <td
                                  style="
                                    vertical-align: middle;
                                    text-align: center;
                                    padding-top: 5px;
                                    padding-bottom: 5px;
                                    padding-left: 5px;
                                    padding-right: 6px;
                                  "
                                >
                                  <a
                                    href="https://www.designedwithbee.com/"
                                    target="_blank"
                                    style="text-decoration: none"
                                    ><img
                                      class="icon"
                                      alt="Designed with BEE"
                                      src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_510656/Signature/bee.png"
                                      height="32"
                                      width="34"
                                      align="center"
                                      style="
                                        display: block;
                                        height: auto;
                                        margin: 0 auto;
                                        border: 0;
                                      "
                                  /></a>
                                </td>
                                <td
                                  style="
                                    font-family: Arial, Helvetica Neue,
                                      Helvetica, sans-serif;
                                    font-size: 15px;
                                    color: #9d9d9d;
                                    vertical-align: middle;
                                    letter-spacing: undefined;
                                    text-align: center;
                                  "
                                >
                                  <a
                                    href="https://www.designedwithbee.com/"
                                    target="_blank"
                                    style="
                                      color: #9d9d9d;
                                      text-decoration: none;
                                    "
                                    >Designed with BEE</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
return message;
};