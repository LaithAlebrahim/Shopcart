import storeitems from "../data/items.json"
import {Row,Col} from "react-bootstrap"
import { StoreItem } from "../component/StoreItem"
export function Store(){
    return (
    <>
    <Row md={2} xs={1} lg={3} className="g-3">
        
            {storeitems.map(item =>(
                    <Col key={item.id}>
                        <StoreItem {...item}/>

                       
                </Col>
         
    ))}
    </Row>
    
    
    </>
    )
}