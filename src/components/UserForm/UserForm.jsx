import './UserForm.css'

export const UserForm = () => {
  return (
    <div class='form-style-3'>
      <form>
        <fieldset>
          <legend>User</legend>
          <label>
            <span>
              Firstname <span class='required'>*</span>
            </span>
            <input type='text' class='input-field' name='field1' value='' />
          </label>

          <label>
            <span>
              Lastname <span class='required'>*</span>
            </span>
            <input type='text' class='input-field' value='' />
          </label>

          <label>
            <span>
              Email <span class='required'>*</span>
            </span>
            <input type='email' class='input-field' value='' />
          </label>

          <label>
            <span>
              Gender <span class='required'>*</span>
            </span>
            <select class='select-field'>
              <option value='Gender' disabled selected hidden>
                Gender
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>

          <label>
            <span>
              Age <span class='required'>*</span>
            </span>
            <input type='text' class='input-field' value='' />
          </label>

          <label>
            <span>
              Address <span class='required'>*</span>
            </span>
            <input type='text' class='input-field' value='' />
          </label>
          <input type='submit' value='Submit' />
        </fieldset>
      </form>
    </div>
  )
}
