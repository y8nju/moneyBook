import { useState } from "react";
import { Form, Table } from "react-bootstrap";

function HIstoryTable({data, onChecked}) {
	
	// console.log(chkItems)
	return ( 
				<tr key={data._id}>
				<td>
				<Form.Check 
					type="checkbox"
					onChange={(e) => onChecked(e.target.checked, data._id)}
					// checked={chkItems.indexOf(data._id) >= 0 ? true : false}
				/>
				</td>
				<td>{new Date(data.date).toLocaleDateString()}</td>
				<td>{data.pattern}</td>
				<td>{data.useDesc}</td>
				<td>{data.cashAmt}</td>
				<td>{data.cardAmt}</td>
				<td>{data.category}</td>
			</tr>);
}

export default HIstoryTable;